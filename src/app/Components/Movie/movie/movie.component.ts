import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs";
import * as MoviesActions from '../../../core/ngrx/movies.actions';
import { AppState } from '../../../core/ngrx/state.interface';
import { selectMovie } from '../../../core/ngrx/movies.selector';
import { ActivatedRoute } from '@angular/router';
import movieDbConf from '../../../core/services/movieDbconfig.json';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit, OnDestroy {

  imgSrc: string;
  movie$: Observable<[]>;
  subscription: Subscription;
  movie: any;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, ) {
    this.movie$ = this.store.select(state => selectMovie(state));
    this.subscription = this.movie$.subscribe(
      (movie: any) => {
        this.movie = movie;
        movie ? this.imgSrc = movieDbConf.imgsrc300 + movie.poster_path : this.imgSrc = "";
      }
    );
  }

  ngOnInit() {
    this.getMovie();
  }

  getMovie(): void {
    this.store.dispatch(MoviesActions.getMovie({ id: Number(this.route.snapshot.params['id']) }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
