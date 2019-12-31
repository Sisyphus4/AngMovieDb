import { createSelector } from '@ngrx/store';
import { AppState, RatingState } from '../../interfaces/state.interface';
import { Rating } from '../../interfaces/rating.interface';

export const selectFeature = (state: AppState) => state.ratingsReducer;

export const selectRating = createSelector(
    selectFeature,
    (state: RatingState) => state.averageRating
);

export const selectUserRating = createSelector(
    selectFeature,
    (state: RatingState) => state.userRating
);

