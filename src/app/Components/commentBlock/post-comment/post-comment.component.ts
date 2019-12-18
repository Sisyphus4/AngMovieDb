import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as CommentsActions from '../../../core/ngrx/actions/comments.actions';
import { AppState } from '../../../core/interfaces/state.interface';
import { Comment } from '../../../core/interfaces/comment.interface';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {

  inputAuthor = new FormControl('');
  inputComment = new FormControl('');
  @Input() movieId: number;
  comment = {} as Comment;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onClick() {
    this.comment.text=this.inputComment.value;
    this.comment.author= this.inputAuthor.value;
    this.comment.movieId = this.movieId,
    this.store.dispatch(CommentsActions.postComment(this.comment));
  }
}
