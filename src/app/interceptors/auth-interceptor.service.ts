import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is own its way');
    this.loadingService.showLoader();
    const authToken = localStorage.getItem('token');
    const authReq = authToken
      ? req.clone({
          setHeaders: { Authorization: authToken },
        })
      : req;

    return next.handle(authReq).pipe(
      finalize(() => {
        this.loadingService.hideLoader();
      }),
      catchError((err) => {
        this.authService.logout();
        return throwError(err);
      })
    );
  }
}
