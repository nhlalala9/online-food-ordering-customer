import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  apiUrl = 'http://localhost:1337';

  constructor(private http: HttpClient) { }

  checkout(order: any): Observable<any> {
    let data = {data:{
      name: order.name,
      date: order.date,
      address: order.address,
      phoneNumber: order.phoneNumber,
      email: order.email,
      cartDetails: order.cartDetails
    }}
    return this.http.post<any>(`${this.apiUrl}/api/orders` , data);
  }
}
