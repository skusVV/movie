"use client";
import { useState, useEffect } from 'react';
import { IMovie } from '@/app/movie'; // Make sure this path is correct

const API_KEY = '453cc599';

interface IProps {
    params: { id: string }; // Updated the params type
}

export default function MoviePage({ params }: IProps) {
    const [movie, setMovie] = useState<IMovie | null>(null);

    const fetchMovie = () => {
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${params.id}`)
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
            <div className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                <img
                    src={movie.Poster}
                    alt={`${movie.Title} Poster`}
                    className="w-full md:w-1/3 h-auto object-cover"
                />
                <div className="p-6 md:p-8 flex-1">
                    <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
                    <div className="space-y-2">
                        <p><strong>Year:</strong> {movie.Year}</p>
                        <p><strong>Rated:</strong> {movie.Rated}</p>
                        <p><strong>Released:</strong> {movie.Released}</p>
                        <p><strong>Runtime:</strong> {movie.Runtime}</p>
                        <p><strong>Genre:</strong> {movie.Genre}</p>
                        <p><strong>Director:</strong> {movie.Director}</p>
                        <p><strong>Writer:</strong> {movie.Writer}</p>
                        <p><strong>Actors:</strong> {movie.Actors}</p>
                        <p><strong>Plot:</strong> {movie.Plot}</p>
                        <p><strong>Language:</strong> {movie.Language}</p>
                        <p><strong>Country:</strong> {movie.Country}</p>
                        <p><strong>Awards:</strong> {movie.Awards}</p>
                        <p><strong>Metascore:</strong> {movie.Metascore}</p>
                        <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                        <p><strong>IMDb Votes:</strong> {movie.imdbVotes}</p>
                        <p><strong>Type:</strong> {movie.Type}</p>
                        <p><strong>DVD:</strong> {movie.DVD}</p>
                        <p><strong>BoxOffice:</strong> {movie.BoxOffice}</p>
                        <p><strong>Production:</strong> {movie.Production}</p>
                        <p><strong>Website:</strong> <a href={movie.Website} className="text-blue-400 hover:underline">{movie.Website}</a></p>
                    </div>
                </div>
            </div>
        </main>
    );
}