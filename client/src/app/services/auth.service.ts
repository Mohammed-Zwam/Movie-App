import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:3000/auth';
  isLoggedIn: boolean = false;
  constructor(private http: HttpClient) {
    this.verify();
  }

  signup(data: any) {
    return this.http.post(`${this.API}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.API}/login`, data, { withCredentials: true });
  }


  verify() {
    return this.http.get(`${this.API}/verify`, { withCredentials: true }).subscribe({
      next: (res: any) => {
        this.isLoggedIn = res.verified;
      },
      error: (err) => {
        this.isLoggedIn = false;
      }
    });
  }

  logout() {
    return this.http.get(`${this.API}/logout`, { withCredentials: true }).subscribe({
      next: (res: any) => {
        this.isLoggedIn = false;
      },
      error: (err) => {
        return err.message;
      }
    });
  }

}
