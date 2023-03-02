import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  apiUrl = 'http://localhost:1337';
  username="Oratile Mabote "
  constructor(private http: HttpClient) { }

  postFormData(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/bookings`, {data:formData});
  }

  getBookings(name:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/bookings?filters[name][$eq]=${this.username}&populate=*`);
  }

 
}
