import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5151/api/Auth'; // Adjust to match backend API
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  /**
   * Check if a token exists in local storage.
   */
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Observable for the login status.
   */
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  /**
   * Perform login by sending credentials to the backend.
   * @param credentials - Login payload (username and password)
   */
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response :any) => {
        if (response && response.token) {
          this.storeToken(response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  /**
   * Logout the user by clearing the token and login status.
   */
  logout(): void {
    this.clearToken();
    this.loggedIn.next(false);
  }

  /**
   * Store JWT token in local storage.
   * @param token - JWT token from backend
   */
  private storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Clear the token from local storage.
   */
  private clearToken(): void {
    localStorage.removeItem('token');
  }

  /**
   * Retrieve the token from local storage.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
