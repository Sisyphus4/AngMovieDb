import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, mapTo } from 'rxjs/operators';
import { RatingsService } from '../../services/myServerService/ratings.service/ratings.service';
import * as RatingsActions from '../actions/rating.actions';
import { Rating, postedRating } from '../../interfaces/rating.interface';
import { GetMovieAction, DeleteAction, updateAction } from '../../interfaces/interfaces';



@Injectable()
export class RatingsEffects {

  loadRatings$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Load Ratings'),
    mergeMap((action: GetMovieAction) => this.RatingsService.getRatings(action.id)
      .pipe(
        map(response => (RatingsActions.getRatingsSuccess(response))),
        catchError(() => EMPTY)
      ))
  )
  );

  uploadrating$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Upload Rating'),
    mergeMap((action: postedRating) => this.RatingsService.postRating(action.movieId, action.voteSum)
      .pipe(
        map(response => (RatingsActions.postRatingSuccess(response))),
        catchError(() => EMPTY)
      ))
  )
  );

  constructor(
    private actions$: Actions,
    private RatingsService: RatingsService
  ) { }
}