import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { MovieDbService } from '../../services/movieDbService/movie-db.service';
import * as MoviesActions from '../actions/movies.actions';
import { Movie } from '../../interfaces/movie.interface';
import { GetMovieAction } from '../../interfaces/interfaces';



@Injectable()
export class MoviesEffects {

  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[Movies Page] Load Movies'),
    mergeMap(() => this.MovieDbService.getMovies()
      .pipe(
        map(response => (MoviesActions.getPopularMoviesSuccess({ movies: response.results }))),
        catchError(() => EMPTY)
      ))
  )
  );

  loadMovie$ = createEffect(() => this.actions$.pipe(
    ofType('[Movie Page] Load Movie'),
    mergeMap((action: GetMovieAction) => this.MovieDbService.getMovie(action.id)
      .pipe(
        map((response: Movie) => (MoviesActions.getMovieSuccess({ movie: response }))),
        catchError(() => EMPTY)
      ))
  )
  );


  constructor(
    private actions$: Actions,
    private MovieDbService: MovieDbService,
  ) { }
}