import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as MoviesActions from '../../core/ngrx/actions/movies.actions';
import { AppState } from '../../core/interfaces/state.interface';
import { selectMovies } from '../../core/ngrx/selectors/movies.selectors';

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
