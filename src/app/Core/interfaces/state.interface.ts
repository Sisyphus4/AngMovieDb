import { Movie } from "./movie.interface"
import { Comment } from './comment.interface';
import { Rating } from './rating.interface';
import { User } from './authentication.interface';

export interface AppState {
    moviesReducer: MovieState;
    commentsReducer: CommentState;
    ratingsReducer: Rating;
    authenticationReducer : UserState;
}
export interface MovieState {
    movies: [];
    movie: Movie;
}

export interface CommentState {
    comments: Comment[];
}

export interface UserState{
    user:User;
    token: string;
    error:string;
}