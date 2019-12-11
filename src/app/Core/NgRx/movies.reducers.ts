import { Action, createReducer, on } from '@ngrx/store';
import * as MoviesActions from './movies.actions';

export interface State {
    movies: [];
}

export const initialState: State = {
    movies: [],
};

const _moviesReducer = createReducer(
    initialState,
    on(MoviesActions.getPopularMoviesSuccess, (state, payload) => ({ ...state, movies: payload.movies})),
);

export function moviesReducer(state: State | undefined, action: Action) {
    return _moviesReducer(state, action);
}