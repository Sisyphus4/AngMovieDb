import { createAction, props } from '@ngrx/store';

export const getPopularMovies = createAction(
    '[Movies Page] Load Movies',
);

export const getPopularMoviesSuccess = createAction(
    '[Movies API] Movies Loaded Success',
    props<{ movies: []}>()
);

export const getComments = createAction(
    '[Movie Page] Load Comments',
    props<{ id: number}>(),
);

export const getCommentsSuccess = createAction(
    '[Movies API] Comments Loaded Success',
    props<{ comments: JSON}>()
);

export interface GetMovieAction{
    id:number;
}
export const getMovie = createAction(
    '[Movie Page] Load Movie',
    props<{ id: number}>(),
);

export const getMovieSuccess = createAction(
    '[Movies API] Movie Loaded Success',
    props<{ movie: any}>()
);