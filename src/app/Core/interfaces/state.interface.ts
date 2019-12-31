import { Movie } from './movie.interface';
import { Comment } from './comment.interface';
import { Rating, UserRating } from './rating.interface';
import { User } from './authentication.interface';

export interface AppState {
    moviesReducer: MovieState;
    commentsReducer: CommentState;
    ratingsReducer: RatingState;
    authenticationReducer: UserState;
}
export interface MovieState {
    movies: [];
    movie: Movie;
    loading: boolean;
}

export interface CommentState {
    comments: Comment[];
}

export interface UserState {
    user: User;
    token: string;
    error: string;
}

export interface RatingState {
    averageRating: number;
    userRating: number;
}
