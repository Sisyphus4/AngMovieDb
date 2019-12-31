import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as CommentsActions from '../../../core/ngrx/actions/comments.actions';
import { AppState } from '../../../core/interfaces/state.interface';
import { Comment } from '../../../core/interfaces/comment.interface';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit, OnDestroy {

  inputComment = new FormControl('', [Validators.required]);
  subscription: Subscription;
  @Input() movieId: number;
  comment = {} as Comment;

  constructor(private store: Store<AppState>, private updates$: Actions) { }

  ngOnInit() {
    this.subscription = this.updates$
      .pipe(
        ofType(CommentsActions.postCommentSuccess),
        tap(() => {
          this.inputComment.setValue('');
        })
      ).subscribe();
  }

  onClick() {
    this.comment.text = this.inputComment.value;
    this.comment.movieId = this.movieId;
    this.store.dispatch(CommentsActions.postComment(this.comment));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
