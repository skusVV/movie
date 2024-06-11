"use client";
import { useReducer, useEffect, useCallback } from 'react';
import Movies from "@/app/componenst/MovieList/MovieList";
import Header from "@/app/componenst/Header/Header";
import { reducer, initialState } from '@/app/store/movie.reducer'
import { debounce } from "@/app/utils";
import {
    addMovies,
    incrementPage,
    resetPage,
    setMovies,
    setSearchTerm,
    setTotalMoviesCount
} from "@/app/store/movie.actions";

const API_KEY = '453cc599' // has to be moved to ENV
const DEBOUNCE_TIME = 1000;

export default function Home() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchMovies = (searchTerm: string, page: number) => {
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
            <Header searchTerm={state.searchTerm} setSearchTerm={(term: string) => dispatch(setSearchTerm(term))}/>
            <Movies movies={state.movies} onGetMore={loadMore}/>
        </main>
    );
}