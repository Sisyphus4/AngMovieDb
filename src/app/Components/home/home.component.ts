import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as MoviesActions from '../../Core/NgRx/movies.actions';
import {State} from '../../Core/NgRx/movies.reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies$: Observable<[]>;
  constructor(private store: Store<State>) {
    this.movies$ = store.pipe(select(state=>state.moviesReducer.movies));
  }

  ngOnInit() {
    this.getMovies();
  }

  console() {
  }

  getMovies(): void {
    this.store.dispatch(MoviesActions.getPopularMovies());
  }
}
