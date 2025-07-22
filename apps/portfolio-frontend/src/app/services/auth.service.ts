import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:5000/api'; // Update this to match your API URL
  private readonly TOKEN_KEY = 'auth_token';
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.API_URL}/Auth/login`, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.isAuthenticatedSubject.next(true);
        }),
        map(() => true)
      );
  }

  logout(): void {
    this.clearToken();
    this.isAuthenticatedSubject.next(false);
  }

  validateToken(): Observable<boolean> {
    if (!this.hasToken()) {
      return new Observable(observer => {
        observer.next(false);
        observer.complete();
      });
    }

    return this.http.post<{ valid: boolean }>(`${this.API_URL}/Auth/validate`, {})
      .pipe(
        map(response => response.valid),
        tap(valid => {
          if (!valid) {
            this.logout();
          }
        })
      );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getAuthHeaders(): { [key: string]: string } {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
}