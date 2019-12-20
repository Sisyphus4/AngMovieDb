import { Action, createReducer, on } from '@ngrx/store';
import * as CommentsActions from '../actions/comments.actions';
import * as MoviesActions from '../actions/movies.actions';
import { MovieState } from '../../interfaces/state.interface';

export const initialState: MovieState = {
    movies: [],
    movie: null,
};

const _moviesReducer = createReducer(
    initialState,
    on(MoviesActions.getPopularMoviesSuccess, (state, payload) => ({ ...state, movies: payload.movies })),
    on(MoviesActions.getMovieSuccess, (state, payload) => ({ ...state, movie: payload.movie })),
);

export function moviesReducer(state: MovieState | undefined, action: Action) {
    return _moviesReducer(state, action);
}