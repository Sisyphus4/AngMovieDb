import { createAction, props } from '@ngrx/store';
import { GetMovieAction } from '../../interfaces/interfaces';
import { Movie } from '../../interfaces/movie.interface';


export const getPopularMovies = createAction(
    '[Movies Page] Load Movies',
);

export const getPopularMoviesSuccess = createAction(
    '[Movies API] Movies Loaded Success',
    props<{ movies: [] }>()
);

export const getMovie = createAction(
    '[Movie Page] Load Movie',
    props<GetMovieAction>(),
);

export const getMovieSuccess = createAction(
    '[Movies API] Movie Loaded Success',
    props<{ movie: Movie }>()
);
