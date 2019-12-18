import { Action, createReducer, on } from '@ngrx/store';
import * as CommentsActions from '../actions/comments.actions';
import * as MoviesActions from '../actions/movies.actions';
import { CommentState } from '../../interfaces/state.interface';

export const initialState: CommentState = {
    comments: [],
};


const _moviesReducer = createReducer(
    initialState,
    on(CommentsActions.getCommentsSuccess, (state, payload) => ({ ...state, comments: payload.comments })),
    on(CommentsActions.postCommentSuccess, (state, payload) => ({ ...state, comments: [...state.comments, payload] })),
    on(CommentsActions.deleteCommentSuccess, (state, payload) =>{
        let comments = [...state.comments];
        let deletedComment=comments.find(comment => comment.id==payload.id)
        comments.splice(comments.indexOf(deletedComment), 1);
        console.log('asd')
        return { ...state, comments }
    }),
);

export function commentsReducer(state: CommentState | undefined, action: Action) {
    return _moviesReducer(state, action);
}