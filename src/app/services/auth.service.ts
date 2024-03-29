import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { SphinxModalService } from './sphinx-modal.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private sphinxModalService: SphinxModalService
  ) {
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
          const userId = response.body.data.userId;
          const token = response.headers.get('Authorization');
          const user = response.body.data;
          if (token && userId) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
        }),
        catchError((error) => {
          // Handle error here
          this.sphinxModalService.openTweetModal$.subscribe(() => {
            this.sphinxModalService.showErrorModal = true;
          })
          return throwError(error);
        })
      );
  }

  signUp(userData: {
    email: string;
    password: string;
    fullName: string;
    userImage: string;
    userName: string;
  }): Observable<any> {
    const apiUrl = `${environment.apiUrl}/user/register`;
    return this.http.post<any>(apiUrl, userData);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
