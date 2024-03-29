import { Component } from '@angular/core';
import { User } from './models/user.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from './services/auth.service';
import { SphinxModalService } from './services/sphinx-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sphinx';
  currentUser: User;
  showErrorModal: Boolean = false; 
  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private sphinxModalService: SphinxModalService
  ) {
    this.subscription = this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
    this.showErrorModal = this.sphinxModalService.showErrorModal
  }
}
