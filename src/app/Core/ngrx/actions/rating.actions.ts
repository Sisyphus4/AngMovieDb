import { createAction, props } from '@ngrx/store';
import { GetMovieAction, DeleteAction } from '../../interfaces/interfaces';
import { Rating, postedRating } from '../../interfaces/rating.interface';

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
    props<postedRating>(),
);

export const postRatingSuccess = createAction(
    '[My API] Upload Rating Success',
    props<Rating>(),
);