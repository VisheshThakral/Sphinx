import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('user');

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(user));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const apiUrl = `${environment.apiUrl}/user/login`;

    return this.http
      .post<any>(apiUrl, credentials, { observe: 'response' })
      .pipe(
        tap((response) => {
          localStorage.setItem(
            'user',
            JSON.stringify({ id: response.body.userId })
          );
          const token = response.headers.get('Authorization');
          if (token) {
            localStorage.setItem('token', token);
          }
          this.currentUserSubject.next({ id: response.body.userId });
        })
      );
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
