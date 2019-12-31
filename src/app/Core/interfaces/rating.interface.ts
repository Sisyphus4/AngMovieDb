export interface Rating {
    rating: number;
}

export interface PostedRating {
    movieId: number;
    voteValue: number;
}

export interface UserRating {
    movieId: number;
    userId: string;
    voteValue: number;
}
