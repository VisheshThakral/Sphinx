import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is own its way');
    if (localStorage.getItem('token')) {
      const modifiedReq = req.clone({
        headers: req.headers.append(
          'Authorization',
          localStorage.getItem('token')
        ),
      });
      return next.handle(modifiedReq)
    }
    return next.handle(req);
  }
}
