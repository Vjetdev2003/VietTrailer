import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../../data/movies';
import { motion } from 'framer-motion';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, title }) => {
  console.log('Rendering MovieGrid with', movies.length, 'movies');
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="py-8">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
      )}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        variants={container}
        initial="hidden"
        animate="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {movies.map((movie) => (
          <motion.div key={movie.id} variants={item}>
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MovieGrid;