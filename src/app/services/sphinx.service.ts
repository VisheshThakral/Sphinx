import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class SphinxService {
  constructor(private http: HttpClient) {}

  updateLikes(sphinxId: Number): Observable<{any}> {
    const apiUrl = `${environment.apiUrl}/user/likes`;
    return this.http.post<any>(apiUrl, { sphinxId });
  }
}
