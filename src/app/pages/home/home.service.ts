import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sphinx } from '../../models/sphinx.model';
import { Pagination } from '../../models/pagination.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {}

  getSphinxList(
    page: number
  ): Observable<{ sphinx: Sphinx[]; paginationInfo: Pagination }> {
    const apiUrl = `${environment.apiUrl}/sphinx/list?page=${page}`;
    return this.http.get<{ sphinx: Sphinx[]; paginationInfo: Pagination }>(apiUrl);
  }
}
