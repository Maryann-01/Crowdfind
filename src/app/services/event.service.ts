import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'https://crowdfind-backend.onrender.com/api/event';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  indicateInterest(eventId: string, numberOfAttendees: number, token: string): Observable<any> {
    const url = `${this.baseUrl}/${eventId}/interest`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    const body = { numberOfAttendees };

    return this.http.post<any>(url, body, { headers });
  }
}
