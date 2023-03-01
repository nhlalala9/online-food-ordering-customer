import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  apiUrl = 'http://localhost:1337';
  constructor(private http: HttpClient) { }

  postFormData(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/bookings`, {data:formData});
  }
}