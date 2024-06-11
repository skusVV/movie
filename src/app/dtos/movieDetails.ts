import { IMovie } from './movie';

interface IRating {
    Source: string;
    Value: string;
}


export interface IMovieDetails extends IMovie{
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Ratings: IRating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string; // I don't think it make sense for us. But let's leave it here for now
}