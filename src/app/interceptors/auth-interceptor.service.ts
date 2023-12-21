import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is own its way');
    const authToken = localStorage.getItem('token');
    const authReq = authToken
      ? req.clone({
          setHeaders: { Authorization: authToken },
        })
      : req;

    return next.handle(authReq).pipe(
      catchError((err) => {
        this.authService.logout();
        return throwError(err);
      })
    );
  }
}
