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
  sphinxId: string;
  @Input() set sphinx(value: Sphinx) {
    this._sphinx = value;
    this.sphinxId = value.sphinxId;
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
    this._sphinx.isLikedByUser = !this._sphinx.isLikedByUser;
    if (this._sphinx.isLikedByUser) {
      this.sphinxService
        .likeSphinx(this.sphinxId)
        .subscribe((response) => this._sphinx.likes++);
    } else {
      this.sphinxService
        .dislikeSphinx(this.sphinxId)
        .subscribe((response) => this._sphinx.likes--);
    }
  }

  toggleRepost() {
    this._sphinx.isRepostedByUser = !this._sphinx.isRepostedByUser;
    if (this._sphinx.isRepostedByUser) {
      this.sphinxService
        .repostSphinx(this.sphinxId)
        .subscribe((response) => this._sphinx.reposts++);
    } else {
      this.sphinxService
        .undoRepost(this.sphinxId)
        .subscribe((response) => this._sphinx.reposts--);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
