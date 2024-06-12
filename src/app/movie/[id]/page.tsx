"use client";
import { useState, useEffect } from 'react';
import { IMovieDetails } from '@/app/dtos/movieDetails';

const API_KEY = '453cc599';

interface IProps {
    params: { id: string };
}

export default function MoviePage({ params }: IProps) {
    const [movie, setMovie] = useState<IMovieDetails | null>(null);

    const fetchMovie = () => {
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${params.id}`)
            .then(res => res.json())
            .then(res => {
                setMovie(res);
            })
            .catch(() => console.log('Oops'));
    }

    useEffect(fetchMovie, [params.id]);

    if (!movie) {
        return <main className="flex justify-center items-center h-screen">Loading...</main>;
    }

    return (
        <main className="container mx-auto p-6">
            <div
                className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                <img
                    src={movie.Poster}
                    alt={`${movie.Title} Poster`}
                    className="w-full md:w-1/3 h-auto object-cover filter brightness-75 hover:brightness-100 transition duration-500"
                />
                <div className="p-6 md:p-8 flex-1 space-y-4">
                    <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">{movie.Title}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><span className="font-semibold text-yellow-400">Year:</span> {movie.Year}</p>
                        <p><span className="font-semibold text-yellow-400">Rated:</span> {movie.Rated}</p>
                        <p><span className="font-semibold text-yellow-400">Released:</span> {movie.Released}</p>
                        <p><span className="font-semibold text-yellow-400">Runtime:</span> {movie.Runtime}</p>
                        <p><span className="font-semibold text-yellow-400">Genre:</span> {movie.Genre}</p>
                        <p><span className="font-semibold text-yellow-400">Director:</span> {movie.Director}</p>
                        <p><span className="font-semibold text-yellow-400">Writer:</span> {movie.Writer}</p>
                        <p><span className="font-semibold text-yellow-400">Actors:</span> {movie.Actors}</p>
                        <p className="col-span-full"><span
                            className="font-semibold text-yellow-400">Plot:</span> {movie.Plot}</p>
                        <p><span className="font-semibold text-yellow-400">Language:</span> {movie.Language}</p>
                        <p><span className="font-semibold text-yellow-400">Country:</span> {movie.Country}</p>
                        <p><span className="font-semibold text-yellow-400">Awards:</span> {movie.Awards}</p>
                        <p><span className="font-semibold text-yellow-400">Metascore:</span> {movie.Metascore}</p>
                        <p><span className="font-semibold text-yellow-400">IMDb Rating:</span> {movie.imdbRating}</p>
                        <p><span className="font-semibold text-yellow-400">IMDb Votes:</span> {movie.imdbVotes}</p>
                        <p><span className="font-semibold text-yellow-400">Type:</span> {movie.Type}</p>
                        <p><span className="font-semibold text-yellow-400">DVD:</span> {movie.DVD}</p>
                        <p><span className="font-semibold text-yellow-400">BoxOffice:</span> {movie.BoxOffice}</p>
                        <p><span className="font-semibold text-yellow-400">Production:</span> {movie.Production}</p>
                        <p><span className="font-semibold text-yellow-400">Website:</span> <a href={movie.Website}
                                                                                              className="text-blue-400 hover:underline">{movie.Website}</a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}