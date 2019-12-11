import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as MoviesActions from '../../Core/NgRx/movies.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies$: Observable<[]>;
  constructor(private store: Store<{ movies: [] }>){
    this.movies$ = store.pipe(select(state=>state.movies));
   }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.store.dispatch(MoviesActions.getPopularMovies());
  }
}
