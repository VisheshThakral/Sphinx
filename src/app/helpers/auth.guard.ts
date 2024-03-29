import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && Object.keys(currentUser).length > 0) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
