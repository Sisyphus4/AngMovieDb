import { createSelector } from '@ngrx/store';
import { AppState } from '../../interfaces/state.interface';
import { Comment } from '../../interfaces/comment.interface';
import { User } from '../../interfaces/authentication.interface';

export const selectFeature = (state: AppState) => state.authenticationReducer;

export const selectUser = createSelector(
    selectFeature,
    (state: User) => state,
);