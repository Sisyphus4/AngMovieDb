import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CommentsActions from '../../../core/ngrx/actions/comments.actions';
import { AppState } from '../../../core/interfaces/state.interface';
import { selectComments } from '../../../core/ngrx/selectors/comments.selectors';
import { selectUser } from '../../../core/ngrx/selectors/authentication.selectors';
import { Comment } from '../../../core/interfaces/comment.interface';
import { User } from 'src/app/core/interfaces/authentication.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() movieId: number;

  user$: Observable<User>;
  comments$: Observable<Comment[]>;
  editingId: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.comments$ = this.store.select(state => selectComments(state, this.movieId));
    this.user$ = this.store.select(state => selectUser(state));
  }

  onDelete(id: string) {
    this.store.dispatch(CommentsActions.deleteComment({ id }));
  }

  onUpdate() {
    this.editingId = '';
  }

  onEdit(id: string) {
    this.editingId = id;
  }
}
