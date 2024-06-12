"use client";
import Movies from "@/app/componenst/MovieList/MovieList";
import Header from "@/app/componenst/Header/Header";
import { setSearchTerm } from "@/app/store/movie.actions";
import { useAppContext, Wrapper } from "@/app/Wrapper";


export default function Home() {
    const { state, dispatch, loadMore } = useAppContext();

    return (
        <main>
            <Header searchTerm={state.searchTerm} setSearchTerm={(term: string) => dispatch(setSearchTerm(term))}/>
            <Movies movies={state.movies} onGetMore={loadMore}/>
        </main>
    );
}