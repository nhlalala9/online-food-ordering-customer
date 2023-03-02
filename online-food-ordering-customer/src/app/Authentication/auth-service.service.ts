import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/local`, { identifier: email, password: password })
      .pipe(
        tap(response => {
          // Save the token to local storage
          localStorage.setItem('token', response.jwt);
        })
      );
  }


  logout() {
    // Remove the token from local storage
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
function tap(arg0: (response: any) => void): import("rxjs").OperatorFunction<any, any> {
  throw new Error('Function not implemented.');
}

