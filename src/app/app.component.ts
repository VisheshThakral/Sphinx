import { Component } from '@angular/core';
import { User } from './models/user.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sphinx';
  currentUser: User;
  private subscription: Subscription;

  constructor(
    private authService: AuthService,
  ) {
    this.subscription = this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }
}
