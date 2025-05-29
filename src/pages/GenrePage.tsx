import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { genres } from '../data/movies';
import { getMoviesByGenre } from '../services/tmdb';
import MovieGrid from '../components/movies/MovieGrid';
import { motion } from 'framer-motion';
import LoaderWrapper from '../components/ui/Loader';
import { Movie } from '../data/movies';

const GenrePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const genreId = id ? parseInt(id, 10) : 0;
  const genreName = genres.find(g => g.id === genreId)?.name || 'Unknown Genre';

  useEffect(() => {
    document.title = `${genreName} Movies - CineVerse`;
    
    const fetchMovies = async () => {
      try {
        const response = await getMoviesByGenre(genreId);
        setMovies(response.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genreId, genreName]);

  if (loading) {
    return <LoaderWrapper />;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              {genreName} Movies
            </span>
          </h1>
          <p className="text-gray-400 mb-8">
            Explore our collection of {movies.length} {genreName.toLowerCase()} movies
          </p>
        </motion.div>

        {movies.length > 0 ? (
          <MovieGrid movies={movies} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="text-2xl font-bold mb-2">No movies found</h2>
            <p className="text-gray-400 max-w-md">
              We couldn't find any movies in the {genreName} genre. Please try another genre.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;