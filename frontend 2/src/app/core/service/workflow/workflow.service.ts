import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private httpClient: HttpClient) { }



  createProject(project: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/workflow/projects', project);
  }

  getProjectById(id: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/api/workflow/projects/${id}`);
  }

  getProjectsOfCurrentUser(): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:8080/api/workflow/projects`);
  }

  convertProjectToTemplate(projectId: string, newName: string, newDescription: string): Observable<any> {
    const body = { newName, newDescription };
    const params = new HttpParams()
      .set('newName', newName)
      .set('newDescription', newDescription);
    return this.httpClient.post<any>(`http://localhost:8080/api/workflow/projects/${projectId}/convert-to-template`, params)

  }

  convertProjectToAutomation(projectId: string, newName: string, newDescription: string, version: string): Observable<any> {
    const body = { newName, newDescription };
    const params = new HttpParams()
      .set('newName', newName)
      .set('newDescription', newDescription)
      .set('version', version);
    return this.httpClient.post<any>(`http://localhost:8080/api/workflow/projects/${projectId}/convert-to-automation`, params)

  }






  getScriptContent(id: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/api/workflow/script/${id}`,);

  }

  getAllAutomations(): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:8080/api/workflow/automations`);
  }
}
