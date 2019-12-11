import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MovieDbService } from '../services/movie-db.service';
import * as MoviesActions from './movies.actions';

@Injectable()
export class MoviesEffects {
 
  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[Movies Page] Load Movies'),
    mergeMap(() => this.MovieDbService.getMovies()
      .pipe(
        map( response=> (MoviesActions.getPopularMoviesSuccess({movies: response.results}))),
        catchError(() => EMPTY)
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private MovieDbService: MovieDbService
  ) {}
}