import {IMovie} from "@/app/dtos/movie";

export type Action =
    | { type: 'SET_SEARCH_TERM'; payload: string }
    | { type: 'SET_MOVIES'; payload: IMovie[] }
    | { type: 'ADD_MOVIES'; payload: IMovie[] }
    | { type: 'SET_TOTAL_MOVIES_COUNT'; payload: number }
    | { type: 'INCREMENT_PAGE' }
    | { type: 'RESET_PAGE' };

export const setMovies = (movies: IMovie[]): Action => ({
    type: 'SET_MOVIES',
    payload: movies
});

export const addMovies = (movies: IMovie[]): Action => ({
    type: 'ADD_MOVIES',
    payload: movies
});


export const setTotalMoviesCount = (moviesCount: number): Action => ({
    type: 'SET_TOTAL_MOVIES_COUNT',
    payload: moviesCount
});

export const incrementPage = (): Action => ({
    type: 'INCREMENT_PAGE',
});

export const resetPage = (): Action => ({
    type: 'RESET_PAGE',
});

export const setSearchTerm = (term: string): Action => ({
    type: 'SET_SEARCH_TERM',
    payload: term
});