import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs";
import * as MoviesActions from '../../../core/ngrx/actions/movies.actions';
import { AppState } from '../../../core/interfaces/state.interface';
import { selectMovie } from '../../../core/ngrx/selectors/movies.selectors';
import { ActivatedRoute } from '@angular/router';
import movieDbConf from '../../../core/services/movieDbService/movieDbconfig.json';
import { Movie } from '../../../core/interfaces/movie.interface';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';


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
  ratingForm;

  constructor(
    private store: Store<AppState>, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getMovie();
    this.movie$ = this.store.select(state => selectMovie(state));
    this.subscription = this.movie$.subscribe(
      (movie: Movie) => {
        this.movie = movie;
        this.imgSrc = movie ? movieDbConf.imgsrc300 + movie.poster_path : '';
      }
    );
    this.ratingForm = this.formBuilder.group({
      voteSum: 0,
      voteCount: 0
    });
  }

  getMovie(): void {
    this.store.dispatch(MoviesActions.getMovie({ id: Number(this.route.snapshot.params['id']) }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
