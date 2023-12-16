import { Component, HostListener } from '@angular/core';
import { HomeService } from '../../pages/home/home.service';
import { Tweet } from '../../models/tweet.model';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css'],
  providers: [HomeService],
})
export class TweetListComponent {
  constructor(
    private homeService: HomeService,
    private loadingService: LoadingService
  ) {}

  tweetList: Tweet[] = [];
  page: number = 1;
  totalPages: number = 0;

  ngOnInit(): void {
    this.loadTweets();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.tweetList.length % 10 === 0 &&
      this.page < this.totalPages
    ) {
      this.page++;
      this.loadTweets();
    }
  }

  loadTweets() {
    this.loadingService.showLoader();
    this.homeService.getTweetsList(this.page).subscribe(
      (response) => {
        this.totalPages = response.paginationInfo.totalPages;
        const newTweets = response.tweets.map((tweet) => {
          return {
            ...tweet,
            authorImgPath: tweet['authImg'],
            timestamp: tweet['createdAt'],
            authorUsername: tweet['userName'],
          };
        });
        this.tweetList = [...this.tweetList, ...newTweets];
      },
      (error) => {
        console.error('Error fetching data:', error);
      },
      () => {
        this.loadingService.hideLoader();
      }
    );
  }
}
