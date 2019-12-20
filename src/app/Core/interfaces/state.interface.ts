import { Movie } from "./movie.interface"
import { Comment } from './comment.interface';
import { Rating } from './rating.interface';

export interface AppState {
    moviesReducer: MovieState;
    commentsReducer: CommentState;
    ratingsReducer: Rating;
}
export interface MovieState {
    movies: [];
    movie: Movie;
}

export interface CommentState {
    comments: Comment[];
}
