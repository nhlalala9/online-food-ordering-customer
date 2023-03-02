import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RatingService {
  apiUrl = 'http://localhost:1337';

  constructor(private http: HttpClient) { }


  getRating(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/ratings`);
  }

  getRatingById(id: any): Observable<any> {
    const url = `${this.apiUrl}/api/products/${id}?populate=*`;
    return this.http.get<any>(url);
  }
  createRating(product: any): Observable<any> {
    let data = {data:{
      comment: product.comment,
      date: product.data,
      name: product.name,
      rate: product.rate
    }}
    return this.http.post<any>(`${this.apiUrl}/api/ratings`, data);
  }

}
