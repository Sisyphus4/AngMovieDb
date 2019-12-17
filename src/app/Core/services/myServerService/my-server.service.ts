import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import  myServerConfig from './myServerConfig.json';


@Injectable({
  providedIn: 'root'
})
export class MyServerService {

  constructor(
    private http: HttpClient,
  ) { }

  getData(type:any, id:number): Observable<JSON> {
    let request;
        switch (type) {
            case 'comments':
                request = `${myServerConfig.getComments}/${id}`;
                break;
        }
    return this.http.get<JSON>(request);
  }

}
