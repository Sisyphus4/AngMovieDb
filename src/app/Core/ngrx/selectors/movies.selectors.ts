import { createSelector } from '@ngrx/store';
import { MovieState, AppState } from '../../interfaces/state.interface';

export const selectFeature = (state: AppState) => state.moviesReducer;

export const selectMovies = createSelector(
  selectFeature,
  (state: MovieState) => state.movies
);

export const selectMovie = createSelector(
  selectFeature,
  (state: MovieState) => state.movie
);