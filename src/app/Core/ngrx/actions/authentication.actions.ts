import { createAction, props } from '@ngrx/store';
import { Login, User, Register } from '../../interfaces/authentication.interface';
import { UserState } from '../../interfaces/state.interface';

export const registerUser = createAction(
    '[My API] Register user',
    props<Register>(),
);

export const registerUserFailure = createAction(
    '[My API] Register user failure',
    props<{ error: string }>(),
);

export const registerUserSuccess = createAction(
    '[My API] Login user Success',
    props<UserState>()
);

export const loginUser = createAction(
    '[My API] Login user',
    props<Login>(),
);

export const loginUserSuccess = createAction(
    '[My API] Login user Success',
    props<UserState>()
);

export const getUser = createAction(
    '[My API] get user',
);

export const getUserSuccess = createAction(
    '[My API] get user success',
    props<User>()
);

export const updateUserRatedMovies = createAction(
    'Update',
    props<{ movieId: number }>()
);
