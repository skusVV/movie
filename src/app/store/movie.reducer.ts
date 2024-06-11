import { IMovie } from "@/app/dtos/movie";
import { Action } from '@/app/store/movie.actions';

interface State {
    searchTerm: string;
    movies: IMovie[];
    totalMoviesCount: number;
    page: number;
}

export const initialState: State = {
    searchTerm: 'Star',
    movies: [],
    totalMoviesCount: 0,
    page: 1,
};

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload };
        case 'SET_MOVIES':
            return { ...state, movies: action.payload };
        case 'ADD_MOVIES':
            return { ...state, movies: [...state.movies, ...action.payload] };
        case 'SET_TOTAL_MOVIES_COUNT':
            return { ...state, totalMoviesCount: action.payload };
        case 'INCREMENT_PAGE':
            return { ...state, page: state.page + 1 };
        case 'RESET_PAGE':
            return { ...state, page: 1 };
        default:
            return state;
    }
}
