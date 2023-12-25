import { Component, Input } from '@angular/core';
import { Sphinx } from '../../../models/sphinx.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sphinx',
  templateUrl: './sphinx.component.html',
  styleUrls: ['./sphinx.component.css']
})
export class SphinxComponent {
  @Input() sphinx: Sphinx;
  user: User;
  private subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  updateSphinxLikes () {
    console.log(this.sphinx)
  }
}
