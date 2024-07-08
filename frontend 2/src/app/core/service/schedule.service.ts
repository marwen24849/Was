import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private httpClient: HttpClient) { }

  getAllSchedules(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/schedules');
  }

  createSchedule(schedule: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/schedules', schedule);
  }



}