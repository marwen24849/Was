import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DesignerService {

  constructor(private httpClient: HttpClient) { }


  updateProject(projectId: any, project: any): Observable<any> {
    return this.httpClient.put<any[]>(`http://localhost:8080/api/projects/${projectId}`, project);
  }

  saveProject(workflow: any): Observable<any[]> {
    return this.httpClient.post<any[]>(`http://localhost:8080/api/projects`, workflow);
  }

  getWorkflowById(id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:8080/api/workflow/${id}`);
  }

  getAllCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:8080/api/group');
  }

  getAllWorkflows(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:8080/api/workflow');
  }



  generateWorkflowScript(id: any): Observable<any> {
    return this.httpClient.get<any[]>(`http://localhost:8080/api/workflow/script/${id}`);
  }

  convertProjectToTemplate(projectId: string, templateName: any, templateDescription: any): Observable<any> {
    return this.httpClient.post<any[]>(`http://localhost:8080/api/projects/${projectId}/sconvert-to-template`, templateName, templateDescription);
  }



}
