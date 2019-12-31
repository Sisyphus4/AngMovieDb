import { Action, createReducer, on } from '@ngrx/store';
import * as MoviesActions from '../actions/movies.actions';
import { MovieState } from '../../interfaces/state.interface';

export const initialState: MovieState = {
    movies: [],
    movie: null,
};

const localMoviesReducer = createReducer(
    initialState,
    on(MoviesActions.getPopularMoviesSuccess, (state, payload) => ({ ...state, movies: payload.movies })),
    on(MoviesActions.getMovieSuccess, (state, payload) => ({ ...state, movie: payload.movie })),
);

export function moviesReducer(state: MovieState | undefined, action: Action) {
    return localMoviesReducer(state, action);
}
