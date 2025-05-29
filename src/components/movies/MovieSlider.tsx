import React, { useState, useRef } from 'react';
import { Movie } from '../../data/movies';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface MovieSliderProps {
  title: string;
  movies: Movie[];
}

const MovieSlider: React.FC<MovieSliderProps> = ({ title, movies }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;

    const { scrollLeft, clientWidth } = sliderRef.current;
    const scrollTo = direction === 'left' 
      ? scrollLeft - clientWidth / 1.5
      : scrollLeft + clientWidth / 1.5;

    sliderRef.current.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button 
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
      
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-40 sm:w-56 md:w-64">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MovieSlider;