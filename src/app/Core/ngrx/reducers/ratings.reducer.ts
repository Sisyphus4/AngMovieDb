import { Action, createReducer, on } from '@ngrx/store';
import * as RatingsActions from '../actions/rating.actions';
import { RatingState } from '../../interfaces/state.interface';

export const initialState: RatingState = {
    averageRating: 0,
    userRating: 0,
};


const localRatingsReducer = createReducer(
    initialState,
    on(RatingsActions.getRatingsSuccess, (state, payload) => ({ ...state, averageRating: payload.rating })),
    on(RatingsActions.postRatingSuccess, (state, payload) => ({ ...state, averageRating: payload.rating })),
    on(RatingsActions.getUserRatingSuccess, (state, payload) => ({ ...state, userRating: payload.rating })),
    on(RatingsActions.postUserRatingSuccess, (state, payload) => ({ ...state, userRating: payload.rating })),
);

export function ratingsReducer(state: RatingState | undefined, action: Action) {
    return localRatingsReducer(state, action);
}
