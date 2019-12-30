import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs";
import * as MoviesActions from '../../../core/ngrx/actions/movies.actions';
import * as RatingsActions from '../../../core/ngrx/actions/rating.actions';
import * as UserActions from '../../../core/ngrx/actions/authentication.actions';
import { AppState } from '../../../core/interfaces/state.interface';
import { selectMovie } from '../../../core/ngrx/selectors/movies.selectors';
import { selectRating } from '../../../core/ngrx/selectors/ratings.selector';
import { ActivatedRoute } from '@angular/router';
import movieDbConf from '../../../core/services/movieDbService/movieDbconfig.json';
import { Movie } from '../../../core/interfaces/movie.interface';
import { selectUser } from 'src/app/core/ngrx/selectors/authentication.selectors';
import { User } from 'src/app/core/interfaces/authentication.interface';
import * as CommentsActions from '../../../core/ngrx/actions/comments.actions';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit, OnDestroy {

  imgSrc: string;
  movie$: Observable<Movie>;
  rating$: Observable<number>;
  user$: Observable<User>;
  subscription: Subscription;
  movie: Movie;
  notRated: boolean;
  user: User;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(MoviesActions.getMovie({ id: Number(this.route.snapshot.params['id']) }));
    this.movie$ = this.store.select(state => selectMovie(state));
    this.rating$ = this.store.select(state => selectRating(state));
    this.user$ = this.store.select(state => selectUser(state));
    this.notRated = false;
    this.subscription = this.movie$.subscribe(
      (movie: Movie) => {
        if (movie) {
          this.movie = movie;
          this.imgSrc = movieDbConf.imgsrc300 + movie.poster_path;
          this.store.dispatch(RatingsActions.getRatings({ id: movie.id }));
          this.store.dispatch(CommentsActions.getComments({ id: movie.id }));
          if (this.user && this.user.ratedMovies && this.user.ratedMovies.length > 0) {
            this.notRated = !this.user.ratedMovies.find(id => id == movie.id);
          }
        }
      }
    );
    this.subscription.add(this.user$.subscribe(
      (user: User) => {
        this.user = user;
        if (this.movie && user.ratedMovies && user.ratedMovies.length > 0) {
          this.notRated = !user.ratedMovies.find(id => id == this.movie.id);
        }
        else {
          if (user) {
            this.notRated = true;
          }
        }
      }
    ));
  }


  onClick(event) {
    this.notRated = false;
    this.store.dispatch(UserActions.updateUserRatedMovies({ movieId: this.movie.id }));
    this.store.dispatch(RatingsActions.postRating({ movieId: this.movie.id, voteSum: Number(event.target.value) }))
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
