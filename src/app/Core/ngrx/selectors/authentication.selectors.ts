import { createSelector } from '@ngrx/store';
import { AppState, UserState } from '../../interfaces/state.interface';
import { Comment } from '../../interfaces/comment.interface';
import { User } from '../../interfaces/authentication.interface';

export const selectFeature = (state: AppState) => state.authenticationReducer;

export const selectUser = createSelector(
    selectFeature,
    (state: UserState) => state.user,
);

export const selectToken = createSelector(
    selectFeature,
    (state: UserState) => state.token,
);

export const selectError = createSelector(
    selectFeature,
    (state: UserState) => state.error,
);