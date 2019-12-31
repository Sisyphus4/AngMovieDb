import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import myServerConfig from '../myServerConfig.json';
import { User } from '../../../interfaces/authentication.interface';
import { Store, select } from '@ngrx/store';
import { AppState, UserState } from '../../../interfaces/state.interface';
import { selectToken } from '../../../ngrx/selectors/authentication.selectors';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    this.token$ = this.store.select(state => selectToken(state));
    this.token$.subscribe(token => {
      if (token) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
      }
    });
  }

  token$: Observable<string>;
  token: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
  };

  registerUser(username: string, password: string, recaptcha: string): Observable<UserState> {
    const request = `${myServerConfig.apiUserRequset}`;
    return this.http.post<UserState>(request, { username, password, recaptcha });
  }

  loginUser(username: string, password: string): Observable<UserState> {
    const request = `${myServerConfig.apiUserRequset}${myServerConfig.loginUser}`;
    return this.http.post<UserState>(request, { username, password });
  }

  getUser(): Observable<User> {
    const request = `${myServerConfig.apiUserRequset}`;
    return this.http.get<User>(request, this.httpOptions);
  }
}
