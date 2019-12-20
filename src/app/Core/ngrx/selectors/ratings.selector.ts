import { createSelector } from '@ngrx/store';
import { AppState } from '../../interfaces/state.interface';
import { Rating } from '../../interfaces/rating.interface';

export const selectFeature = (state: AppState) => state.ratingsReducer;

export const selectRating = createSelector(
    selectFeature,
    (state: Rating) => state.rating
);