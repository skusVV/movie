"use client";
import {useReducer, useEffect, useCallback, ReactNode, createContext, useContext, Dispatch} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { reducer, initialState, State } from '@/app/store/movie.reducer';
import { Action } from '@/app/store/movie.actions';
import { debounce } from "@/app/utils";
import {
    addMovies,
    incrementPage,
    resetPage,
    setMovies,
    setTotalMoviesCount
} from "@/app/store/movie.actions";

const API_KEY = '453cc599' // has to be moved to ENV
const DEBOUNCE_TIME = 1000;

const AppContext: any = createContext({});

export function Wrapper({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchMovies = (searchTerm: string, page: number) => {
        console.log('pathname', pathname)
        if(pathname !== '/') {
            router.replace('/');
        }
        fetch(`https://www.omdbapi.com/?s=${searchTerm}&plot=full&r=json&apikey=${API_KEY}&page=${page}&size=10`)
            .then(res => res.json())
            .then(res => {
                if (!res.Error) {
                    if (page === 1) {
                        dispatch(setMovies(res.Search));
                    } else {
                        dispatch(addMovies(res.Search));
                    }
                    dispatch(setTotalMoviesCount(res.totalResults));
                }
            })
            .catch(() => console.log('Oops'));
    }

    const loadMore = () => {
        if (state.movies.length < state.totalMoviesCount) {
            dispatch(incrementPage());
        }
    }

    const debouncedSearch = useCallback(debounce((query: string) => {
        dispatch(setMovies([]));
        dispatch(resetPage());
        fetchMovies(query, 1);
    }, DEBOUNCE_TIME), []);

    useEffect(() => {
        if (state.searchTerm) {
            debouncedSearch(state.searchTerm);
        }
    }, [state.searchTerm, debouncedSearch]);

    useEffect(() => {
        if (state.page > 1) {
            fetchMovies(state.searchTerm, state.page);
        }
    }, [state.page]);

    return (
        <main>
            <AppContext.Provider value={{ state, dispatch, loadMore }}>
                {children}
            </AppContext.Provider>
        </main>
    );
}
interface IAppContext {
    state: State;
    dispatch: Dispatch<Action>;
    loadMore: () => void;
}
export const useAppContext = () : IAppContext => {
    return useContext<IAppContext>(AppContext);
};