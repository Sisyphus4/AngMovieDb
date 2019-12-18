import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CommentsActions from '../../../core/ngrx/actions/comments.actions';
import { AppState } from '../../../core/interfaces/state.interface';
import { selectComments } from '../../../core/ngrx/selectors/comments.selectors';
import { Comment } from '../../../core/interfaces/comment.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() movieId: number;

  comments$: Observable<Comment[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(CommentsActions.getComments({ id: this.movieId }));
    this.comments$ = this.store.select(state => selectComments(state, this.movieId));
  }

  onDelete(id: string) {
    this.store.dispatch(CommentsActions.deleteComment({ id: id }));
  }

}
