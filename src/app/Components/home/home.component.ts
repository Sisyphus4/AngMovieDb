import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as MoviesActions from '../../core/ngrx/movies.actions';
import { AppState } from '../../core/ngrx/state.interface';
import { selectMovies } from '../../core/ngrx/movies.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  movies$: Observable<[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.getMovies();
    this.movies$ = this.store.select(state => selectMovies(state));
  }

  getMovies(): void {
    this.store.dispatch(MoviesActions.getPopularMovies());
  }
}
