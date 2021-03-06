import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, mapTo } from 'rxjs/operators';
import { CommentsService } from '../../services/myServerService/comments.service/comments.service';
import * as CommentsActions from '../actions/comments.actions';
import { Comment } from '../../interfaces/comment.interface';
import { GetMovieAction, DeleteAction, UpdateAction } from '../../interfaces/interfaces';



@Injectable()
export class CommentsEffects {

  loadComments$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Load Comments'),
    mergeMap((action: GetMovieAction) => this.commentsService.getComments(action.id)
      .pipe(
        map(response => (CommentsActions.getCommentsSuccess({ comments: response }))),
        catchError(() => EMPTY)
      ))
  )
  );

  uploadComment$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Upload Comment'),
    mergeMap((action: Comment) => this.commentsService.postComment(action.movieId, action.text)
      .pipe(
        map(response => (CommentsActions.postCommentSuccess(response))),
        catchError(() => EMPTY)
      ))
  )
  );

  editComment$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Edit Comment'),
    mergeMap((action: UpdateAction) => this.commentsService.editComment(action.id, action.text)
      .pipe(
        map(response => (CommentsActions.editCommentSuccess(response))),
        catchError(() => EMPTY)
      ))
  )
  );

  deleteComment$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Delete Comment'),
    mergeMap((action: DeleteAction) => this.commentsService.deleteComment(action.id)
      .pipe(
        map(response => CommentsActions.deleteCommentSuccess({ id: action.id })),
        catchError(() => EMPTY)
      ))
  )
  );

  constructor(
    private actions$: Actions,
    private commentsService: CommentsService
  ) { }
}
