import React, { useEffect, useState } from 'react';
import MovieHero from '../components/movies/MovieHero';
import MovieGrid from '../components/movies/MovieGrid';
import MovieSlider from '../components/movies/MovieSlider';
import { genres } from '../data/movies';
import { motion } from 'framer-motion';
import { getTrendingMovies, getPopularMovies, getTopRatedMovies, getMovieDetails, getDiscoverMovies } from '../services/tmdb';
import LoaderWrapper, { Loader } from '../components/ui/Loader';
import type { Movie } from '../data/movies';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [exploreMovies, setExploreMovies] = useState<Movie[]>([]);
  const [exploreCurrentPage, setExploreCurrentPage] = useState(1);
  const [exploreTotalPages, setExploreTotalPages] = useState(1);
  const [isFetchingExplore, setIsFetchingExplore] = useState(false);

  useEffect(() => {
    document.title = 'CineVerse - Điểm đến phim của bạn';

    const fetchInitialMovies = async () => {
      setLoading(true);
      try {
        const [trendingResponse, popularResponse, topRatedResponse, discoverResponse] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
          getDiscoverMovies(1)
        ]);

        // Set state for sliders
        const trendingDetails = await getMovieDetails(trendingResponse.results[0].id);
        setFeaturedMovie(trendingDetails);
        setTrendingMovies(trendingResponse.results || []);
        setPopularMovies(popularResponse.results || []);
        setTopRatedMovies(topRatedResponse.results || []);

        // Set state for Explore All Movies
        setExploreMovies(discoverResponse.results || []);
        setExploreTotalPages(discoverResponse.total_pages || 1);
        setExploreCurrentPage(1);

      } catch (error) {
        console.error('Error fetching initial movies:', error);
        setFeaturedMovie(null);
        setTrendingMovies([]);
        setPopularMovies([]);
        setTopRatedMovies([]);
        setExploreMovies([]);
        setExploreTotalPages(1);
        setExploreCurrentPage(1);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialMovies();
  }, []);

  useEffect(() => {
    const fetchMoreExploreMovies = async () => {
      setIsFetchingExplore(true);
      try {
        const response = await getDiscoverMovies(exploreCurrentPage);
        setExploreMovies(prevMovies => [...prevMovies, ...(response.results || [])]);
      } catch (error) {
        console.error('Error fetching more explore movies:', error);
      } finally {
        setIsFetchingExplore(false);
      }
    };

    if (exploreCurrentPage > 1) {
      fetchMoreExploreMovies();
    }

  }, [exploreCurrentPage]); // Depend on exploreCurrentPage

  const handleLoadMoreExplore = () => {
    setExploreCurrentPage(prevPage => prevPage + 1);
  };

  if (loading && exploreMovies.length === 0) {
    return <LoaderWrapper />;
  }

  return (
    <div>
      {/* Hero Section */}
      {featuredMovie && <MovieHero movie={featuredMovie} />}

      <div className="container mx-auto px-4 pt-8 pb-16">
        {/* Trending Movies Slider */}
        {trendingMovies.length > 0 && <MovieSlider title="Đang thịnh hành" movies={trendingMovies} />}
        
        {/* Popular Movies */}
        {popularMovies.length > 0 && <MovieSlider title="Phim phổ biến" movies={popularMovies} />}
        
        {/* Top Rated Movies */}
        {topRatedMovies.length > 0 && <MovieSlider title="Đánh giá cao nhất" movies={topRatedMovies} />}

        {/* All Movies Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {exploreMovies.length > 0 ? (
            <MovieGrid movies={exploreMovies} title="Khám phá tất cả phim" />
          ) : (!loading && exploreMovies.length === 0) ? (
            <div className="text-center text-gray-400 py-10">
              Không có phim nào để khám phá.
            </div>
          ) : null} {/* Don't render anything while initial loading if no movies */}
          
          {/* Load More Button and Loading */}
          {!loading && exploreCurrentPage < exploreTotalPages && (
            <div className="mt-8 flex flex-col items-center">
              {isFetchingExplore && (
                <div className="mb-4">
                  <Loader />
                </div>
              )}
              {!isFetchingExplore && (
                <button
                  onClick={handleLoadMoreExplore}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors"
                >
                  Tải thêm phim
                </button>
              )}
            </div>
          )}

        </motion.div>

        {/* Genres Section */}
        {genres.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                Duyệt theo thể loại
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {genres.map((genre) => (
                <motion.div
                  key={genre.id}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <a
                    href={`/genre/${genre.id}`}
                    className="block p-4 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-center transition-colors"
                  >
                    <span className="text-white font-medium">{genre.name}</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;