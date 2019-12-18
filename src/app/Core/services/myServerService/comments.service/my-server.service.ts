import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import myServerConfig from '../myServerConfig.json';
import { Comment } from '../../../interfaces/comment.interface'


@Injectable({
  providedIn: 'root'
})

export class MyServerService {

  constructor(
    private http: HttpClient,
  ) { }

  getComments(id: number): Observable<Comment[]> {
    let request = `${myServerConfig.apiCommentRequset}/${id}${myServerConfig.getComments}`;
    return this.http.get<Comment[]>(request);
  }

  postComment(movieId: number, text: string, author: string): Observable<Comment> {
    let request = `${myServerConfig.apiCommentRequset}/${movieId}${myServerConfig.postComment}`;
    return this.http.post<Comment>(request, { text, author });
  }

  deleteComment(id: string): Observable<JSON> {
    let request = `${myServerConfig.apiCommentRequset}${myServerConfig.deleteComment}/${id}`;
    return this.http.delete<JSON>(request);
  }
}
