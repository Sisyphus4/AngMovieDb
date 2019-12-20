import { Action, createReducer, on } from '@ngrx/store';
import * as RatingsActions from '../actions/rating.actions';
import { Rating } from '../../interfaces/rating.interface';

export const initialState: Rating = {
    rating:0
};


const _ratingsReducer = createReducer(
    initialState,
    on(RatingsActions.getRatingsSuccess, (state, payload) => ({ ...state, ...payload })),
    on(RatingsActions.postRatingSuccess, (state, payload) => ({ ...state, ...payload })),
);

export function ratingsReducer(state: Rating | undefined, action: Action) {
    return _ratingsReducer(state, action);
}