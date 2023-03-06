import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/local`, { identifier: email, password: password })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  register(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password };
    return this.http.post<any>(`${this.apiUrl}/auth/local/register`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(error.error.message || 'Server error');
  }
  
  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserRole() {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const roles = decodedToken?.roles || [];
      const customerRole = roles.find((role: any) => role.name === 'Customer');
      return customerRole ? 'customer' : 'admin';
    } else {
      return null;
    }
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }
}
