import { createAction, props } from '@ngrx/store';

export const getPopularMovies = createAction(
    '[Movies Page] Load Movies',
);

export const getPopularMoviesSuccess = createAction(
    '[Movies API] Movies Loaded Success',
    props<{ movies: []}>()
);

export const increment = createAction('[Counter Component] Increment');
