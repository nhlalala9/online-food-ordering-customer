import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl = 'http://localhost:1337';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/products?populate=*`);
  }

  getById(id: any): Observable<any> {
    const url = `${this.apiUrl}/api/products/${id}?populate=*`;
    return this.http.get<any>(url);
  }
  createProducts(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/products`, product);
  }

  updateProducts(product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/products/${product.id}`, product);
  }

  deleteProducts(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/products/${productId}`);
  }
  updateItemStatus(id: any, status: any) {
    const url = `${this.apiUrl}/api/products/${id}`;
    const data = { data: { status: status } };
    return this.http.put(url, data);
  }
}
