import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import myServerConfig from '../myServerConfig.json';
import { Rating } from '../../../interfaces/rating.interface'
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../interfaces/state.interface';
import { selectToken } from '../../../ngrx/selectors/authentication.selectors';

@Injectable({
  providedIn: 'root'
})

export class RatingsService {

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

  getRatings(movieId: number): Observable<Rating> {
    let request = `${myServerConfig.apiRatingRequset}/${movieId}`;
    return this.http.get<Rating>(request);
  }

  postRating(movieId: number, voteSum: number): Observable<Rating> {
    let request = `${myServerConfig.apiRatingRequset}/${movieId}`;
    return this.http.post<Rating>(request, { voteSum }, this.httpOptions);
  }
}