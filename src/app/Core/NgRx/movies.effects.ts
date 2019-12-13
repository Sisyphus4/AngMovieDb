import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { MovieDbService } from '../services/movie-db.service';
import * as MoviesActions from './movies.actions';

@Injectable()
export class MoviesEffects {

  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[Movies Page] Load Movies'),
    mergeMap(() => this.MovieDbService.getData('movies', 0)
      .pipe(
        map(response => (MoviesActions.getPopularMoviesSuccess({ movies: response.results }))),
        catchError(() => EMPTY)
      ))
  )
  );

  loadMovie$ = createEffect(() => this.actions$.pipe(
    ofType('[Movie Page] Load Movie'),
    mergeMap((action:any) => this.MovieDbService.getData('movie', action.id)
      .pipe(
        map(response => (MoviesActions.getMovieSuccess({ movie: response }))),
        catchError(() => EMPTY)
      ))
  )
  );

  constructor(
    private actions$: Actions,
    private MovieDbService: MovieDbService
  ) { }
}