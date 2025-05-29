import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { Movie } from '../../data/movies';
import { motion } from 'framer-motion';
import { getImageUrl } from '../../services/tmdb';

interface MovieHeroProps {
  movie: Movie;
}

const MovieHero: React.FC<MovieHeroProps> = ({ movie }) => {
  return (
    <div className="relative w-full h-[70vh] md:h-[80vh]">
      {/* Backdrop Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={getImageUrl(movie.backdrop_path)}
          alt={`${movie.title} backdrop`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{movie.title}</h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center mb-4 text-sm"
            >
              <span className="inline-flex items-center bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                </svg>
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-gray-300">{new Date(movie.release_date).getFullYear()}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-gray-300">{movie.runtime ? `${movie.runtime} phút` : '---'}</span>
            </motion.div>

            <motion.div 
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {movie.genres?.map((genre) => (
                <Link 
                  key={genre.id}
                  to={`/genre/${genre.id}`}
                  className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm text-gray-300 text-sm rounded-full hover:bg-gray-700/50 transition-colors"
                >
                  {genre.name}
                </Link>
              ))}
            </motion.div>
            
            <motion.p 
              className="text-gray-300 mb-8 max-w-xl line-clamp-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {movie.overview}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {movie.trailerKey && (
                <a 
                  href={`https://www.youtube.com/watch?v=${movie.trailerKey}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Xem Trailer
                </a>
              )}
              <Link 
                to={`/movie/${movie.id}`}
                className="inline-flex items-center px-6 py-3 bg-gray-700/50 backdrop-blur-sm hover:bg-gray-700 text-white font-medium rounded-full transition-colors"
              >
                <Info className="h-5 w-5 mr-2" />
                Chi tiết
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;