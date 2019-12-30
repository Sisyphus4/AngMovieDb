export interface Login {
    username: string,
    password: string,
}

export interface Register {
    username: string,
    password: string,
    recaptcha: string
}

export interface User {
    userId: string,
    username: string,
    ratedMovies: number[],
}

