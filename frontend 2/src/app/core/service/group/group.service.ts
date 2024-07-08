import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../../models/interface/Group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }



  getAllGroups(): Observable<Group[]> {
    return this.httpClient.get<Group[]>('http://localhost:8080/api/group');
  }
  createGroup(group: Group): Observable<Group> {
    return this.httpClient.post<Group>('http://localhost:8080/api/group/createGroup', group);
  }

  getGroupById(id: string): Observable<Group> {
    return this.httpClient.get<Group>(`http://localhost:8080/api/group/${id}`);
  }

  deleteGroupById(id: string): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:8080/api/group/${id}`);
  }
  updateGroup(id: string, group: any): Observable<Group> {
    return this.httpClient.put<Group>(`http://localhost:8080/api/group/${id}`, group);
  }

  getTasksByGroupId(id: string): Observable<any> {
    return this.httpClient.get<any[]>(`http://localhost:8080/api/task/group/${id}`);
  }


}
