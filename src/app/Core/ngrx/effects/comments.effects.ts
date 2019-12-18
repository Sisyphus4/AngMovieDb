import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, mapTo } from 'rxjs/operators';
import { MyServerService } from '../../services/myServerService/comments.service/my-server.service';
import * as CommentsActions from '../actions/comments.actions';
import { Comment } from '../../interfaces/comment.interface';
import { GetMovieAction, DeleteAction } from '../../interfaces/interfaces';



@Injectable()
export class CommentsEffects {

  loadComments$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Load Comments'),
    mergeMap((action: GetMovieAction) => this.MyServerService.getComments(action.id)
      .pipe(
        map(response => (CommentsActions.getCommentsSuccess({ comments: response }))),
        catchError(() => EMPTY)
      ))
  )
  );

  uploadComment$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Upload Comment'),
    mergeMap((action: Comment) => this.MyServerService.postComment(action.movieId, action.text, action.author)
      .pipe(
        map(response => (CommentsActions.postCommentSuccess(response))),
        catchError(() => EMPTY)
      ))
  )
  );

  deleteComment$ = createEffect(() => this.actions$.pipe(
    ofType('[My API] Delete Comment'),
    mergeMap((action: DeleteAction) => this.MyServerService.deleteComment(action.id)
      .pipe(
        map(response => {
          console.log(response);
          return CommentsActions.deleteCommentSuccess({ id: action.id })
        }),
        catchError(() => EMPTY)
      ))
  )
  );

  constructor(
    private actions$: Actions,
    private MyServerService: MyServerService
  ) { }
}