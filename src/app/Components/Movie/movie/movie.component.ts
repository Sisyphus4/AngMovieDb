import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs";
import * as MoviesActions from '../../../core/ngrx/movies.actions';
import { AppState } from '../../../core/ngrx/state.interface';
import { selectMovie } from '../../../core/ngrx/movies.selector';
import { ActivatedRoute } from '@angular/router';
import movieDbConf from '../../../core/services/movieDbconfig.json';
import { Movie } from './movie.interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit, OnDestroy {

  imgSrc: string;
  movie$: Observable<Movie>;
  subscription: Subscription;
  movie: Movie;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.getMovie();
    this.movie$ = this.store.select(state => selectMovie(state));
    this.subscription = this.movie$.subscribe(
      (movie: Movie) => {
        this.movie = movie;
        this.imgSrc = movie ? movieDbConf.imgsrc300 + movie.poster_path : '';
      }
    );
  }

  getMovie(): void {
    this.store.dispatch(MoviesActions.getMovie({ id: Number(this.route.snapshot.params['id']) }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
