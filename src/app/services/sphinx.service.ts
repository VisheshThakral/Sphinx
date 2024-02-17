import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class SphinxService {
  constructor(private http: HttpClient) {}

  uploadUserImage(formData: FormData): Observable<any> {
    const apiUrl = `${environment.apiUrl}/user/upload-image`;
    return this.http.post<any>(apiUrl, formData);
  }

  postSphinx(content: string): Observable<any> {
    const apiUrl = `${environment.apiUrl}/sphinx/create`;
    return this.http.post<any>(apiUrl, { content });
  }

  likeSphinx(sphinxId: string): Observable<any> {
    const apiUrl = `${environment.apiUrl}/user/likes`;
    return this.http.post<any>(apiUrl, { sphinxId });
  }

  dislikeSphinx(sphinxId: string): Observable<any> {
    const apiUrl = `${environment.apiUrl}/user/dislike/${sphinxId}`;
    return this.http.delete<any>(apiUrl);
  }

  repostSphinx(sphinxId: string): Observable<any> {
    const apiUrl = `${environment.apiUrl}/user/repost`;
    return this.http.post<any>(apiUrl, { sphinxId });
  }

  undoRepost(sphinxId: string): Observable<any> {
    const apiUrl = `${environment.apiUrl}/user/repost/${sphinxId}`;
    return this.http.delete<any>(apiUrl);
  }
}
