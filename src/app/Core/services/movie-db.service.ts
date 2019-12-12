import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import  movieDbConf from './movieDbconfig.json';

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

  getData(type:any, id:number): Observable<Response> {
    let request;
        switch (type) {
            case 'movie':
                request = `${movieDbConf.getMovieRequest}${id}?api_key=${movieDbConf.APIkey}`;
                break;
            case 'movies':
                request = `${movieDbConf.getPopularMoviesRequest}&api_key=${movieDbConf.APIkey}`;
                break;
            case 'cast':
                request = `${movieDbConf.getMovieRequest}${id}/${movieDbConf.getCastRequest}?api_key=${movieDbConf.APIkey}`;
                break;
            case 'searchMovie':
                request = `${movieDbConf.searchMovieRequest}?api_key=${movieDbConf.APIkey}&query=${id}`;
                break;
        }
    return this.http.get<Response>(request);
  }

}
