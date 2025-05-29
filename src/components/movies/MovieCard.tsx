import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Movie } from '../../data/movies';
import { motion } from 'framer-motion';
import { getImageUrl } from '../../services/tmdb';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg bg-gray-800 h-full shadow-xl hover:shadow-2xl transition-all duration-300"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Link to={`/movie/${movie.id}`} className="block h-full">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
            <div className="flex items-center text-yellow-400 font-medium">
              <Star className="h-4 w-4 mr-1 fill-current" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white font-semibold line-clamp-1">{movie.title}</h3>
          <div className="flex items-center mt-2 text-gray-400 text-sm">
            <Clock className="h-3 w-3 mr-1" />
            <span className="mr-1">Năm ra mắt</span>
            <span ></span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {movie.genres?.slice(0, 2).map((genre) => (
              <span 
                key={genre.id}
                className="inline-block px-2 py-1 text-xs rounded bg-gray-700 text-gray-300"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
    
  );
};

export default MovieCard;