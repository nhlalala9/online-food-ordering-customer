import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  apiUrl = 'http://localhost:1337';
 
  public username = localStorage.getItem('s_username');
  
  constructor(private http: HttpClient) { }

  postFormData(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/bookings`, {data:formData});
  }

  getBookings(name:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/bookings?filters[name][$eq]=${this.username}&populate=*`);
  }
  getBooking(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/bookings`);
  }
  updateItemStatus(id: any, camel: any) {
    const url = `${this.apiUrl}/api/bookings/${id}`;
    const data = { data: { camel: camel } };
    return this.http.put(url, data);
  }
 
}
