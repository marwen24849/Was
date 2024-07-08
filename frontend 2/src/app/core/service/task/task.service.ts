import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/interface/Task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }



  getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('http://localhost:8080/api/task');
  }
  createTask(task: Task, groupId: string): Observable<Task> {
    return this.httpClient.post<Task>(`http://localhost:8080/api/task/createTask/${groupId}`, task);
  }

  getTaskById(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`http://localhost:8080/api/task/${id}`);
  }

  deleteTaskById(id: string): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:8080/api/task/${id}`);
  }
  updateTask(id: string, task: any): Observable<Task> {
    return this.httpClient.put<Task>(`http://localhost:8080/api/group/${id}`, task);
  }

  getTasksByGroupId(id: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`http://localhost:8080/api/task/group/${id}`);
  }
}
