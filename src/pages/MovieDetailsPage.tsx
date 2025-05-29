import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Star, Clock, Calendar, User } from 'lucide-react';
import { getMovieDetails, getImageUrl } from '../services/tmdb';
import { Movie, genres } from '../data/movies';
import TrailerModal from '../components/movies/TrailerModal';
import { motion } from 'framer-motion';
import LoaderWrapper from '../components/ui/Loader';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (id) {
          const fetchedMovie = await getMovieDetails(parseInt(id, 10));
          setMovie(fetchedMovie);
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (movie) {
      document.title = `${movie.title} - CineVerse`;
    }
  }, [movie]);

  if (loading) {
    return <LoaderWrapper />;
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy phim</h2>
        <p className="text-gray-400 mb-6">Bộ phim bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.</p>
        <Link to="/" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors">
          Trở về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Backdrop */}
      <div className="relative pt-16 pb-8 md:pt-20 md:pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src={getImageUrl(movie.backdrop_path)}
            alt={`${movie.title} backdrop`}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie Poster */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/3 lg:w-1/4"
            >
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
            
            {/* Movie Info */}
            <motion.div 
              className="md:w-2/3 lg:w-3/4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center text-yellow-400">
                  <Star className="h-5 w-5 mr-1 fill-current" />
                  <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{movie.runtime ? `${movie.runtime} phút` : '---'}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Calendar className="h-5 w-5 mr-1" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <User className="h-5 w-5 mr-1" />
                  <span>{movie.director || 'Chưa có thông tin'}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {movie.genres.map((genre) => {
                  const translatedGenre = genres.find(g => g.id === genre.id);
                  return (
                    <Link 
                      key={genre.id}
                      to={`/genre/${genre.id}`}
                      className="px-4 py-1 bg-gray-800/70 backdrop-blur-sm text-gray-300 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      {translatedGenre ? translatedGenre.name : genre.name}
                    </Link>
                  );
                })}
              </div>
              
              <p className="text-gray-300 text-lg mb-8">{movie.overview}</p>
              
              <div className="flex flex-wrap gap-4">
                {movie.trailerKey && (
                  <button
                    onClick={() => setIsTrailerOpen(true)}
                    className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Xem Trailer
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Cast Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">
          <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            Diễn viên
          </span>
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movie.cast.map((person) => (
            <motion.div
              key={person.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="aspect-[3/4]">
                <img
                  src={getImageUrl(person.profile_path, 'w185')}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-white">{person.name}</h3>
                <p className="text-sm text-gray-400">Vai: {person.character}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Trailer Modal */}
      {movie.trailerKey && (
        <TrailerModal
          trailerKey={movie.trailerKey}
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
        />
      )}
    </>
  );
};

export default MovieDetailsPage;