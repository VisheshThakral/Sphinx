import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;
  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    const hasToken = !!localStorage.getItem('token');

    this.isLoggedInSubject = new BehaviorSubject<boolean>(hasToken);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const apiUrl = `${environment.apiUrl}/user/login`;

    return this.http
      .post<any>(apiUrl, credentials, { observe: 'response' })
      .pipe(
        tap((response) => {
          const token = response.headers.get('Authorization');
          if (token) {
            localStorage.setItem('token', token);
            this.isLoggedInSubject.next(true);
          }
          // this.currentUserSubject.next({ id: response.body.userId });
        })
      );
  }

  public get isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  // public get currentUserValue(): User {}

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }
}
