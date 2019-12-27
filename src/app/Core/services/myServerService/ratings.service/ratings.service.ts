import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import myServerConfig from '../myServerConfig.json';
import { Rating } from '../../../interfaces/rating.interface'


@Injectable({
  providedIn: 'root'
})

export class RatingsService {

  constructor(
    private http: HttpClient,
  ) { }

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