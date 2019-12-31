import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, mapTo } from 'rxjs/operators';
import { UserRatingService } from '../../services/myServerService/userRating.service/user-rating.service';
import { RatingsService } from '../../services/myServerService/ratings.service/ratings.service';
import * as RatingsActions from '../actions/rating.actions';
import { PostedRating } from '../../interfaces/rating.interface';
import { GetMovieAction, } from '../../interfaces/interfaces';



@Injectable()
export class RatingsEffects {

  loadRatings$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Load Ratings'),
    mergeMap((action: GetMovieAction) => this.ratingsService.getRatings(action.id)
      .pipe(
        map(response => (RatingsActions.getRatingsSuccess(response))),
        catchError(() => EMPTY)
      ))
  )
  );

  uploadrating$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Upload Rating'),
    mergeMap((action: PostedRating) => this.ratingsService.postRating(action.movieId, action.voteValue)
      .pipe(
        map(response => (RatingsActions.postRatingSuccess(response))),
        catchError(() => EMPTY)
      ))
  )
  );

  loadUserRating$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Load User Rating'),
    mergeMap((action: GetMovieAction) => this.userRatingService.getUserRating(action.id)
      .pipe(
        map(response => (RatingsActions.getUserRatingSuccess(response))),
        catchError(() => EMPTY)
      ))
  )
  );

  uploadUserRatin$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Upload User Rating'),
    mergeMap((action: PostedRating) => this.userRatingService.postUserRating(action.movieId, action.voteValue)
      .pipe(
        map(response => (RatingsActions.postUserRatingSuccess(response))),
        catchError(() => EMPTY)
      ))
  )
  );

  constructor(
    private actions$: Actions,
    private ratingsService: RatingsService,
    private userRatingService: UserRatingService,
  ) { }
}
