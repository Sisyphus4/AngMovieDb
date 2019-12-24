import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs";
import * as MoviesActions from '../../../core/ngrx/actions/movies.actions';
import * as RatingsActions from '../../../core/ngrx/actions/rating.actions';
import { AppState } from '../../../core/interfaces/state.interface';
import { selectMovie } from '../../../core/ngrx/selectors/movies.selectors';
import { selectRating } from '../../../core/ngrx/selectors/ratings.selector';
import { ActivatedRoute } from '@angular/router';
import movieDbConf from '../../../core/services/movieDbService/movieDbconfig.json';
import { Movie } from '../../../core/interfaces/movie.interface';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit, OnDestroy {

  imgSrc: string;
  movie$: Observable<Movie>;
  rating$: Observable<number>;
  subscription: Subscription;
  movie: Movie;
  rated: boolean;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(MoviesActions.getMovie({ id: Number(this.route.snapshot.params['id']) }));
    this.movie$ = this.store.select(state => selectMovie(state));
    this.rating$ = this.store.select(state => selectRating(state));
    this.subscription = this.movie$.subscribe(
      (movie: Movie) => {
        if (movie) {
          this.movie = movie;
          this.imgSrc = movieDbConf.imgsrc300 + movie.poster_path;
          this.store.dispatch(RatingsActions.getRatings({ id: movie.id }));
        }
      }
    );
  }


  onClick(event) {
    this.rated = true;
    this.store.dispatch(RatingsActions.postRating({ movieId: this.movie.id, voteSum: Number(event.target.value) }))
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
