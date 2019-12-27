import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import myServerConfig from '../myServerConfig.json';
import { User, Response } from '../../../interfaces/authentication.interface'


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    private http: HttpClient,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };

  registerUser(username: string, password: string): Observable<User> {
    let request = `${myServerConfig.apiUserRequset}`;
    return this.http.post<User>(request, { username, password });
  }

  loginUser(username: string, password: string): Observable<Response> {
    let request = `${myServerConfig.apiUserRequset}${myServerConfig.loginUser}`;
    return this.http.post<Response>(request, { username, password });
  }

  getUser(): Observable<User> {
    let request = `${myServerConfig.apiUserRequset}`;
    return this.http.get<User>(request, this.httpOptions);
  }
}
