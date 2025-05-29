import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Movie } from '../data/movies';
import { searchMovies } from '../services/tmdb';
import MovieGrid from '../components/movies/MovieGrid';
import SearchBar from '../components/ui/SearchBar';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import LoaderWrapper from '../components/ui/Loader';

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query') || '';
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    document.title = `Search: ${query} - CineVerse`;
    
    const fetchResults = async () => {
      setLoading(true);
      setCurrentPage(1); // Reset to first page on new search
      try {
        const response = await searchMovies(query, 1);
        setResults(response.results || []);
        setTotalPages(response.total_pages || 1);
      } catch (error) {
        console.error('Error searching movies:', error);
        setResults([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setResults([]);
      setLoading(false);
      setCurrentPage(1);
      setTotalPages(1);
    }

  }, [query]);

  useEffect(() => {
    const fetchMoreResults = async () => {
      setIsFetchingMore(true);
      try {
        const response = await searchMovies(query, currentPage);
        setResults(prevResults => [...prevResults, ...(response.results || [])]);
      } catch (error) {
        console.error('Error fetching more movies:', error);
      } finally {
        setIsFetchingMore(false);
      }
    };

    if (currentPage > 1) {
      fetchMoreResults();
    }

  }, [currentPage, query]);

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const clearSearch = () => {
    navigate('/');
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Search Results
              </h1>
              <div className="flex items-center">
                <p className="text-gray-400">
                  {results.length} {results.length === 1 ? 'result' : 'results'} for:
                </p>
                <span className="ml-2 px-3 py-1 bg-gray-800 rounded-full text-white font-medium flex items-center">
                  {query}
                  <button onClick={clearSearch} className="ml-2 text-gray-400 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </span>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <SearchBar />
            </div>
          </div>
        </motion.div>

        {loading && results.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <LoaderWrapper />
          </div>
        ) : results.length > 0 ? (
          <>
            <MovieGrid movies={results} />
            {currentPage < totalPages && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={isFetchingMore}
                  className={`px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors ${isFetchingMore ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isFetchingMore ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        ) : (query && !loading && results.length === 0) ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <Search className="h-16 w-16 text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No results found</h2>
            <p className="text-gray-400 max-w-md mb-6">
              We couldn't find any movies matching "{query}". Please try another search term.
            </p>
            <button
              onClick={clearSearch}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors"
            >
              Back to Home
            </button>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchResultsPage;