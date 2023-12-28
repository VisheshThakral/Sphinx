import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SphinxModalService } from 'src/app/services/sphinx-modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  currentUser: User;
  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private sphinxModalService: SphinxModalService
  ) {
    this.subscription = this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  getUserLogOut() {
    this.authService.logout();
  }

  postSphinxHandler() {
    this.sphinxModalService.openTweetModal();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  performSearch(searchTerm) {}
}
