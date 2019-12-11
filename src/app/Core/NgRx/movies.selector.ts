import { createSelector } from '@ngrx/store';
 
 
export interface AppState {
  movies: [];
}

export const selectPopularMovies = (state: AppState) => state.movies;