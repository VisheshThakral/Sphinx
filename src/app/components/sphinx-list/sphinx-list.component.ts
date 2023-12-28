import { Component, HostListener, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { HomeService } from '../../pages/home/home.service';
import { Sphinx } from '../../models/sphinx.model';
import { SphinxModalService } from 'src/app/services/sphinx-modal.service';

@Component({
  selector: 'app-sphinx-list',
  templateUrl: './sphinx-list.component.html',
  styleUrls: ['./sphinx-list.component.css'],
  providers: [HomeService],
})
export class SphinxListComponent implements OnDestroy {
  constructor(
    private homeService: HomeService,
    private sphinxModalService: SphinxModalService
  ) {}

  sphinxList: Sphinx[] = [];
  page: number = 1;
  totalPages: number = 0;
  showTweetModal: boolean = false;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadSphinxes();
    this.sphinxModalService.openTweetModal$.subscribe(() => {
      this.showTweetModal = true;
    });

    this.sphinxModalService.closeTweetModal$.subscribe(() => {
      this.showTweetModal = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.sphinxList.length % 10 === 0 &&
      this.page < this.totalPages
    ) {
      this.page++;
      this.loadSphinxes();
    }
  }

  loadSphinxes() {
    this.homeService
      .getSphinxList(this.page)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          this.totalPages = response.paginationInfo.totalPages;
          const newSphinxs = response.sphinx;
          this.sphinxList = [...this.sphinxList, ...newSphinxs];
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }
}
