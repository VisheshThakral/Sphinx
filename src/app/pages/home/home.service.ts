import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tweet } from '../../models/tweet.model';
import { Pagination } from '../../models/pagination.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {}

  getTweetsList(
    page: number
  ): Observable<{ tweets: Tweet[]; paginationInfo: Pagination }> {
    const apiUrl = `${environment.apiUrl}/tweets?page=${page}`;
    return this.http.get<{ tweets: Tweet[]; paginationInfo: Pagination }>(apiUrl);
  }
}
