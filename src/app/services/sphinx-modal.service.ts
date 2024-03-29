import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SphinxModalService {
  constructor() {}
  private openTweetModalSource = new Subject<void>();
  private closeTweetModalSource = new Subject<void>();
  showErrorModal: Boolean = false;

  openTweetModal$ = this.openTweetModalSource.asObservable();
  closeTweetModal$ = this.closeTweetModalSource.asObservable();

  openTweetModal(): void {
    this.openTweetModalSource.next();
  }

  closeTweetModal(): void {
    this.closeTweetModalSource.next();
  }
}
