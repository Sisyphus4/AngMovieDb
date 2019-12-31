import { createAction, props } from '@ngrx/store';
import { GetMovieAction } from '../../interfaces/interfaces';
import { Rating, PostedRating, UserRating } from '../../interfaces/rating.interface';

export const getRatings = createAction(
    '[My API] Load Ratings',
    props<GetMovieAction>(),
);

export const getRatingsSuccess = createAction(
    '[My API] Ratings Loaded Success',
    props<Rating>()
);

export const postRating = createAction(
    '[My API] Upload Rating',
    props<PostedRating>(),
);

export const postRatingSuccess = createAction(
    '[My API] Upload Rating Success',
    props<Rating>(),
);

export const getUserRating = createAction(
    '[My API] Load User Rating',
    props<GetMovieAction>(),
);

export const getUserRatingSuccess = createAction(
    '[My API] User Rating Loaded Success',
    props<Rating>()
);

export const postUserRating = createAction(
    '[My API] Upload User Rating',
    props<PostedRating>(),
);

export const postUserRatingSuccess = createAction(
    '[My API] Upload User Rating Success',
    props<Rating>(),
);
