export interface Login {
    username: string,
    password: string,
}
export interface User {
    userId:string,
    username: string,
    ratedMovies: number[],
}

export interface Response {
    userId:string,
    username: string,
    ratedMovies: [],
    token: string
}