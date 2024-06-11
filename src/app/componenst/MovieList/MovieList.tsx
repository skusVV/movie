import { useEffect, useRef } from 'react';
import { IMovie } from '@/app/dtos/movie';
import Movie from '../Movie/Movie';

interface IProps {
    movies: IMovie[];
    onGetMore: () => void;
}

export default function Movies({ movies, onGetMore }: IProps) {
    const observer = useRef<IntersectionObserver | null>(null);
    const lastMovieElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                onGetMore();
            }
        });

        if (lastMovieElementRef.current) {
            observer.current.observe(lastMovieElementRef.current);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [movies]);

    return (
        <section className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                {movies.map((movie: IMovie, index) => {
                    if (index === movies.length - 1) {
                        return (
                            <div ref={lastMovieElementRef} key={movie.imdbID}>
                                <Movie movie={movie} />
                            </div>
                        );
                    } else {
                        return <Movie key={movie.imdbID} movie={movie} />;
                    }
                })}
            </div>
        </section>
    );
}