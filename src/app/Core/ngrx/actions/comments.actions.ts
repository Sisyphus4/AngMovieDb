import { createAction, props } from '@ngrx/store';
import { GetMovieAction, DeleteAction } from '../../interfaces/interfaces';
import { Comment } from '../../interfaces/comment.interface';

export const getComments = createAction(
    '[My API] Load Comments',
    props<GetMovieAction>(),
);

export const getCommentsSuccess = createAction(
    '[My API] Comments Loaded Success',
    props<{ comments: Comment[] }>()
);

export const postComment = createAction(
    '[My API] Upload Comment',
    props<Comment>(),
);

export const postCommentSuccess = createAction(
    '[My API] Upload Comment Success',
    props<Comment>(),
);

export const deleteComment = createAction(
    '[My API] Delete Comment',
    props<DeleteAction>(),
);

export const deleteCommentSuccess = createAction(
    '[My API] Deleted',
    props<DeleteAction>(),
);