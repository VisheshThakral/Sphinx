import { Component, HostListener, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { HomeService } from '../../pages/home/home.service';
import { Sphinx } from '../../models/sphinx.model';

@Component({
  selector: 'app-sphinx-list',
  templateUrl: './sphinx-list.component.html',
  styleUrls: ['./sphinx-list.component.css'],
  providers: [HomeService],
})
export class SphinxListComponent implements OnDestroy {
  constructor(private homeService: HomeService) {}

  sphinxList: Sphinx[] = [];
  page: number = 1;
  totalPages: number = 0;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadSphinxes();
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
          const newSphinxs = response.sphinx.map((sphinx) => {
            return {
              ...sphinx,
              authorImgPath: sphinx['authImg'],
              timestamp: sphinx['createdAt'],
              authorUsername: sphinx['userName'],
            };
          });
          this.sphinxList = [...this.sphinxList, ...newSphinxs];
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }
}
