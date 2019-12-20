import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import movieDbConf from './movieDbconfig.json';
import { Movie } from '../../interfaces/movie.interface'

class Response {
  results: [];
}

@Injectable({
  providedIn: 'root'
})
export class MovieDbService {

  constructor(
    private http: HttpClient,
  ) { }

  getMovies(): Observable<Response> {
    let request = `${movieDbConf.getPopularMoviesRequest}&api_key=${movieDbConf.APIkey}`;
    return this.http.get<Response>(request);
  }
  getMovie(id: number): Observable<Movie> {
    let request = `${movieDbConf.getMovieRequest}${id}?api_key=${movieDbConf.APIkey}`;
    return this.http.get<Movie>(request);
  }
}
