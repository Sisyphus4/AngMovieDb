import { Action, createReducer, on } from '@ngrx/store';
import * as AuthenticationActions from '../actions/authentication.actions';
import { User } from '../../interfaces/authentication.interface';

export const initialState: User = {
    userId: '',
    username: '',
    ratedMovies: [],
};


const _authenticationReducer = createReducer(
    initialState,
    on(AuthenticationActions.loginUserSuccess, (state, payload) => ({ ...state, userId: payload.userId, username: payload.username, ratedMovies: payload.ratedMovies })),
    on(AuthenticationActions.updateUserRatedMovies, (state, payload) => ({ ...state, ratedMovies: [...state.ratedMovies, payload.movieId.toString()] }))
);

export function authenticationReducer(state: User | undefined, action: Action) {
    return _authenticationReducer(state, action);
}