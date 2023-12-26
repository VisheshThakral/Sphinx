import { Component, Input, OnDestroy } from '@angular/core';
import { Sphinx } from '../../../models/sphinx.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { SphinxService } from 'src/app/services/sphinx.service';

@Component({
  selector: 'app-sphinx',
  templateUrl: './sphinx.component.html',
  styleUrls: ['./sphinx.component.css'],
  providers: [SphinxService],
})
export class SphinxComponent implements OnDestroy {
  _sphinx: Sphinx;
  @Input() set sphinx(value: Sphinx) {
    this._sphinx = value;
  }
  user: User;
  sphinxLiked: boolean = false;
  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private sphinxService: SphinxService
  ) {
    this.subscription = this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  toggleLikes() {
    console.log(this._sphinx);
    const sphinxId = this._sphinx.sphinxId;
    this._sphinx.isLikedByUser = !this._sphinx.isLikedByUser;
    if (this._sphinx.isLikedByUser) {
      this.sphinxService
        .likeSphinx(sphinxId)
        .subscribe((response) => this._sphinx.likes++);
    } else {
      this.sphinxService
        .dislikeSphinx(sphinxId)
        .subscribe((response) => this._sphinx.likes--);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
