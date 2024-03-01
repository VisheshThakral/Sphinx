import { Component, Input } from '@angular/core';
import { Sphinx } from '../../../models/sphinx.model';
import { SphinxService } from 'src/app/services/sphinx.service';

@Component({
  selector: 'app-sphinx',
  templateUrl: './sphinx.component.html',
  styleUrls: ['./sphinx.component.css'],
  providers: [SphinxService],
})
export class SphinxComponent {
  _sphinx: Sphinx;
  sphinxId: string;
  @Input() set sphinx(value: Sphinx) {
    this._sphinx = value;
    this.sphinxId = value.sphinxId;
  }
  sphinxLiked: boolean = false;

  constructor(private sphinxService: SphinxService) {}

  toggleLikes() {
    this._sphinx.isLikedByUser = !this._sphinx.isLikedByUser;
    if (this._sphinx.isLikedByUser) {
      this.sphinxService
        .likeSphinx(this.sphinxId)
        .subscribe(() => this._sphinx.likes++);
    } else {
      this.sphinxService
        .dislikeSphinx(this.sphinxId)
        .subscribe(() => this._sphinx.likes--);
    }
  }

  toggleRepost() {
    this._sphinx.isRepostedByUser = !this._sphinx.isRepostedByUser;
    if (this._sphinx.isRepostedByUser) {
      this.sphinxService
        .repostSphinx(this.sphinxId)
        .subscribe(() => this._sphinx.reposts++);
    } else {
      this.sphinxService
        .undoRepost(this.sphinxId)
        .subscribe(() => this._sphinx.reposts--);
    }
  }
}
