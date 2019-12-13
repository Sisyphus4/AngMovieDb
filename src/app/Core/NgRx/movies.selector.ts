import { createSelector } from '@ngrx/store';
import { State, AppState } from './state.interface';
 
export const selectFeature = (state: AppState) => state.moviesReducer;
 
export const selectMovies = createSelector(
  selectFeature,
  (state: State) => state.movies
);

export const selectMovie = createSelector(
  selectFeature,
  (state: State) => state.movie
);