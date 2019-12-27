import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, mapTo } from 'rxjs/operators';
import { AuthenticationService } from '../../services/myServerService/authentication.service/authentication.service';
import * as AuthenticationActions from '../actions/authentication.actions';
import { Login, User } from '../../interfaces/authentication.interface';
import { tap } from 'rxjs/operators';



@Injectable()
export class AuthenticationEffects {

  registerUser$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Register user'),
    mergeMap((action: Login) => this.AuthenticationService.registerUser(action.username, action.password)
      .pipe(
        map(response => (AuthenticationActions.registerUserSuccess({ ...response }))),
        catchError(() => EMPTY)
      ))
  )
  );

  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Login user'),
    mergeMap((action: Login) => this.AuthenticationService.loginUser(action.username, action.password)
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
    mergeMap(() => this.AuthenticationService.getUser()
      .pipe(
        map(response => AuthenticationActions.loginUserSuccess({ ...response })),
        catchError(() => EMPTY)
      ))
  )
  );

  constructor(
    private actions$: Actions,
    private AuthenticationService: AuthenticationService
  ) { }
}