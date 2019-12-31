import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import myServerConfig from '../myServerConfig.json';
import { Rating } from '../../../interfaces/rating.interface';
import { Store } from '@ngrx/store';
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
    });
  }

  token$: Observable<string>;
  token: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
  };

  getRatings(movieId: number): Observable<Rating> {
    const request = `${myServerConfig.apiRatingRequset}/${movieId}`;
    return this.http.get<Rating>(request);
  }

  postRating(movieId: number, voteValue: number): Observable<Rating> {
    const request = `${myServerConfig.apiRatingRequset}/${movieId}`;
    return this.http.post<Rating>(request, { voteValue }, this.httpOptions);
  }
}
