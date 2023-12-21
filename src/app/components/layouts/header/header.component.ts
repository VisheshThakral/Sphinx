import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  currentUser: User;
  private subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = this.authService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
      }
    )
  }

  getUserLogOut() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
