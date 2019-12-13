import { createAction, props } from '@ngrx/store';

export const getPopularMovies = createAction(
    '[Movies Page] Load Movies',
);

export const getPopularMoviesSuccess = createAction(
    '[Movies API] Movies Loaded Success',
    props<{ movies: []}>()
);

export const getMovie = createAction(
    '[Movie Page] Load Movie',
    props<{ id: number}>(),
);

export const getMovieSuccess = createAction(
    '[Movies API] Movie Loaded Success',
    props<{ movie: any}>()
);