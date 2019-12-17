import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { MovieDbService } from '../services/movieDbService/movie-db.service';
import { MyServerService } from '../services/myServerService/my-server.service';
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
    mergeMap((action: MoviesActions.GetMovieAction) => this.MovieDbService.getData('movie', action.id)
      .pipe(
        map(response => (MoviesActions.getMovieSuccess({ movie: response }))),
        catchError(() => EMPTY)
      ))
  )
  );

  loadComments$ = createEffect(() => this.actions$.pipe(
    ofType('[Movie Page] Load Comments'),
    mergeMap((action: MoviesActions.GetMovieAction) => this.MyServerService.getData('comments', action.id)
      .pipe(
        map(response => (MoviesActions.getCommentsSuccess({ comments: response}))),
        catchError(() => EMPTY)
      ))
  )
  );

  constructor(
    private actions$: Actions,
    private MovieDbService: MovieDbService,
    private MyServerService: MyServerService
  ) { }
}