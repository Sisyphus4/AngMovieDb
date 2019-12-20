import { Movie } from "./movie.interface"
import { Comment } from './comment.interface';

export interface AppState {
    moviesReducer: MovieState;
    commentsReducer: CommentState;
}
export interface MovieState {
    movies: [];
    movie: Movie;
}

export interface CommentState {
    comments: Comment[];
}