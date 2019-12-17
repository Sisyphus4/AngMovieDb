import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as MoviesActions from '../../core/ngrx/movies.actions';
import { AppState } from '../../core/ngrx/state.interface';
import { selectComments } from '../../core/ngrx/movies.selector';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() id: number;

  comments$: Observable<JSON>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.getComments();
    this.comments$ = this.store.select(state => selectComments(state));
  }

  getComments(): void {
    this.store.dispatch(MoviesActions.getComments({id: this.id}));
  }
}
