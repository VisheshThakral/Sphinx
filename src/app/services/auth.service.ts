import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  
  login(credentials: { email: string; password: string }): Observable<any> {
    const apiUrl = `${environment.apiUrl}/user/login`;

    return this.http
      .post<any>(apiUrl, credentials, { observe: 'response' })
      .pipe(
        tap((response) => {
          const token = response.headers.get('Authorization');
          if (token) {
            localStorage.setItem('token', token);
            this.isLoggedInSubject.next(true)
          }
        })
      );
  }
}
