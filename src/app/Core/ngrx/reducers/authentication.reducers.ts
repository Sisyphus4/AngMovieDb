import { Action, createReducer, on } from '@ngrx/store';
import * as AuthenticationActions from '../actions/authentication.actions';
import { User } from '../../interfaces/authentication.interface';
import { UserState } from '../../interfaces/state.interface';

export const initialState: UserState = {
    user: null,
    token: '',
    error: '',
};

//Make it better!
const _authenticationReducer = createReducer(
    initialState,
    on(AuthenticationActions.loginUserSuccess, (state, payload) => ({
        ...state,
        user: payload.user,
        token: payload.token,
        error: ''
    })),
    on(AuthenticationActions.updateUserRatedMovies, (state, payload) => ({ ...state, user: { ratedMovies: [...state.user.ratedMovies, payload.movieId.toString()] } })),
    on(AuthenticationActions.getUserSuccess, (state, payload) => ({ ...state, user: payload })),
    on(AuthenticationActions.registerUserFailure, (state, payload) => ({ ...state, error: payload.error })),
);

export function authenticationReducer(state: UserState | undefined, action: Action) {
    return _authenticationReducer(state, action);
}