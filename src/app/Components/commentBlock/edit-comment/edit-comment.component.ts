import { Component, OnInit, Input, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as CommentsActions from '../../../core/ngrx/actions/comments.actions';
import { AppState } from '../../../core/interfaces/state.interface';
import { Comment } from '../../../core/interfaces/comment.interface';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})

export class EditCommentComponent implements OnInit, OnDestroy {
  inputComment = new FormControl('');
  subscription: Subscription;
  @Input() comment: Comment;
  @Output() update = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>, private updates$: Actions) { }

  ngOnInit() {
    this.inputComment.setValue(this.comment.text);
    this.subscription = this.updates$
      .pipe(
        ofType(CommentsActions.postCommentSuccess),
        tap(() => {
          this.update.emit(true);
        })
      ).subscribe();
  }

  onClick() {
    this.comment.text = this.inputComment.value;
    this.store.dispatch(CommentsActions.editComment(this.comment));
    this.update.emit(true);
  }

  onCancel() {
    this.update.emit(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

