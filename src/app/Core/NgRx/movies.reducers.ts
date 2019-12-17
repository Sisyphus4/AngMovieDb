import { Action, createReducer, on } from '@ngrx/store';
import * as MoviesActions from './movies.actions';
import { State } from './state.interface';

export const initialState: State = {
    movies: [],
    movie: null,
    comments: null,
};

const _moviesReducer = createReducer(
    initialState,
    on(MoviesActions.getPopularMoviesSuccess, (state, payload) => ({ ...state, movies: payload.movies })),
    on(MoviesActions.getMovieSuccess, (state, payload) => ({ ...state, movie: payload.movie })),
    on(MoviesActions.getCommentsSuccess, (state, payload) => ({ ...state, comments: payload.comments })),
);

export function moviesReducer(state: State | undefined, action: Action) {
    return _moviesReducer(state, action);
}