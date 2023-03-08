import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = 'http://localhost:1337/api/orders';

  public username = localStorage.getItem('s_username');
  constructor(private http: HttpClient) { }

  // getOrders(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  getOrders(name:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?filters[name][$eq]=${this.username}&populate=*`);
  }

  getOrderByName(id:number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updateItemStatus(id: any, status: any) {
    const url = `${this.apiUrl}/${id}`;
    const data = { data: { status: status } };
    return this.http.put(url, data);
  }
}

