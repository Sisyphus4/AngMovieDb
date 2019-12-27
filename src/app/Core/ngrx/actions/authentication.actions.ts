import { createAction, props } from '@ngrx/store';
import { Login, User } from '../../interfaces/authentication.interface';

export const registerUser = createAction(
    '[My API] Register user',
    props<Login>(),
);

export const registerUserSuccess = createAction(
    '[My API] Register user Success',
    props<User>()
);

export const loginUser = createAction(
    '[My API] Login user',
    props<Login>(),
);

export const loginUserSuccess = createAction(
    '[My API] Login user Success',
    props<User>()
);

export const getUser = createAction(
    '[My API] get user',
);

export const updateUserRatedMovies = createAction(
    'Update',
    props<{ movieId: number }>()
);