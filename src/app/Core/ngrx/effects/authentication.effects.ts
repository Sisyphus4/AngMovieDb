import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../services/myServerService/authentication.service/authentication.service';
import * as AuthenticationActions from '../actions/authentication.actions';
import { Login, Register } from '../../interfaces/authentication.interface';



@Injectable()
export class AuthenticationEffects {

  registerUser$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Register user'),
    mergeMap((action: Register) => this.authenticationService.registerUser(action.username, action.password, action.recaptcha)
      .pipe(
        map(response => {
          window.localStorage.setItem('token', response.token);
          return AuthenticationActions.loginUserSuccess({ ...response });
        }),
        catchError(err => {
          return of(AuthenticationActions.registerUserFailure({ error: err.error.error }));
        })
      ))
  )
  );

  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Login user'),
    mergeMap((action: Login) => this.authenticationService.loginUser(action.username, action.password)
      .pipe(
        map(response => {
          window.localStorage.setItem('token', response.token);
          return AuthenticationActions.loginUserSuccess({ ...response });
        }),
        catchError(() => EMPTY)
      ))
  )
  );

  getUser$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] get user'),
    mergeMap(() => this.authenticationService.getUser()
      .pipe(
        map(response => AuthenticationActions.getUserSuccess({ ...response })),
        catchError(() => EMPTY)
      ))
  )
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService
  ) { }
}
