import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        this.isAuthenticated = isLoggedIn;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
