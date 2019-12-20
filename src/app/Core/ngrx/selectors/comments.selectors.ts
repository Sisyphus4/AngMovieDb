import { createSelector } from '@ngrx/store';
import { CommentState, AppState } from '../../interfaces/state.interface';
import { Comment } from '../../interfaces/comment.interface'

export const selectFeature = (state: AppState) => state.commentsReducer;

export const selectComments = createSelector(
  selectFeature,
  (state: CommentState, id:number) => {
    if (state.comments) {
      let comments = state.comments.filter((comment: Comment) => {
        return comment.movieId === id;
      });
      comments.sort((firstComment: Comment, secondComment: Comment) => {
        return Number(firstComment.createdAt > secondComment.createdAt);
      })
      return comments;
    }
    else {
      return [];
    }
  }
);