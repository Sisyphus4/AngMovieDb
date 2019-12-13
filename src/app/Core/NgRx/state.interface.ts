import {Movie} from "../../components/Movie/movie/movie.interface"

export interface AppState {
    moviesReducer: State;
}
export interface State {
    movies: [];
    movie: Movie;
}