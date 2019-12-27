import { Action, createReducer, on } from '@ngrx/store';
import * as CommentsActions from '../actions/comments.actions';
import * as MoviesActions from '../actions/movies.actions';
import { CommentState } from '../../interfaces/state.interface';

export const initialState: CommentState = {
    comments: [],
};


const _commentsReducer = createReducer(
    initialState,
    on(CommentsActions.getCommentsSuccess, (state, payload) => ({ ...state, comments: payload.comments })),
    on(CommentsActions.postCommentSuccess, (state, payload) => ({ ...state, comments: [...state.comments, payload] })),
    on(CommentsActions.deleteCommentSuccess, (state, payload) => {
        let comments = [...state.comments];
        let deletedComment = comments.find(comment => comment.id == payload.id)
        comments.splice(comments.indexOf(deletedComment), 1);
        return { ...state, comments }
    }),
    on(CommentsActions.editCommentSuccess, (state, payload) => {
        let comments = state.comments.map(comment => {
            if(comment.id===payload.id){
                comment=payload;
            }
            return comment;
        });
        return { ...state, comments }
    }),
);

export function commentsReducer(state: CommentState | undefined, action: Action) {
    return _commentsReducer(state, action);
}