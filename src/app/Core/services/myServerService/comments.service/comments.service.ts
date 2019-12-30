import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import myServerConfig from '../myServerConfig.json';
import { Comment } from '../../../interfaces/comment.interface'
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../interfaces/state.interface';
import { selectToken } from '../../../ngrx/selectors/authentication.selectors';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    this.token$ = this.store.select(state => selectToken(state));
    this.token$.subscribe(token => {
      if (token) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
      }
    })
  }

  token$: Observable<string>;
  token: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };

  getComments(moiveId: number): Observable<Comment[]> {
    let request = `${myServerConfig.apiCommentRequset}/${moiveId}`;
    return this.http.get<Comment[]>(request);
  }

  postComment(movieId: number, text: string): Observable<Comment> {
    let request = `${myServerConfig.apiCommentRequset}/${movieId}`;
    return this.http.post<Comment>(request, { text }, this.httpOptions);
  }

  editComment(id: string, text: string): Observable<Comment> {
    let request = `${myServerConfig.apiCommentRequset}/${id}`;
    return this.http.put<Comment>(request, { text }, this.httpOptions);
  }

  deleteComment(id: string): Observable<JSON> {
    let request = `${myServerConfig.apiCommentRequset}/${id}`;
    return this.http.delete<JSON>(request, this.httpOptions);
  }
}
