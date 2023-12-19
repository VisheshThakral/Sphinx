import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
  }
}
