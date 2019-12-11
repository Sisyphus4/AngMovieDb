import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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

  private moviesUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=619815e4b2022dff08a72fdc13100b01';

  getMovies(): Observable<Response> {
    return this.http.get<Response>(this.moviesUrl);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
