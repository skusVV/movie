import { IMovie } from '@/app/dtos/movie';
import Link from 'next/link';

interface IProps {
    movie: IMovie;
}

export default function Movie({ movie }: IProps) {
    return (
        <section className="bg-white rounded-lg shadow-md p-4 max-w-xs w-full h-96">
            <div className="w-full h-60 bg-gray-200 rounded-t-lg overflow-hidden">
                <img
                    src={movie.Poster}
                    alt={`${movie.Title} Poster`}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 flex flex-col justify-between h-36">
                <div>
                    <h2 className="text-lg font-bold mb-2">{movie.Title}</h2>
                    <p className="text-sm text-gray-600">Year: {movie.Year}</p>
                    <p className="text-sm text-gray-600">Type: {movie.Type}</p>
                </div>
                <Link href={`/movie/${movie.imdbID}`}>
                    <p className="text-blue-500 hover:underline mt-2 block">
                        View Details
                    </p>
                </Link>
            </div>
        </section>
    );
}
