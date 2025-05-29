import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Movie } from '../../data/movies';
import { searchMovies, getImageUrl } from '../../services/tmdb';
import { Loader } from './Loader';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 2) {
        setLoading(true);
        try {
          const response = await searchMovies(query);
          setResults(response.results);
          setIsOpen(true);
        } catch (error) {
          console.error('Error searching movies:', error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    };

    const timeoutId = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setQuery('');
      setIsOpen(false);
    }
  };

  const handleResultClick = (id: number) => {
    navigate(`/movie/${id}`);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full md:w-64">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full bg-gray-800 text-white rounded-full pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Search className="h-5 w-5 text-gray-400" />
        </span>
        {query && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => setQuery('')}
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </form>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-4 flex justify-center">
              <Loader />
            </div>
          ) : results.length > 0 ? (
            <>
              <ul>
                {results.map((movie) => (
                  <li key={movie.id} className="border-b border-gray-700 last:border-0">
                    <button
                      className="flex items-center w-full p-3 text-left hover:bg-gray-700 transition-colors"
                      onClick={() => handleResultClick(movie.id)}
                    >
                      <div className="w-10 h-14 flex-shrink-0 mr-3">
                        <img
                          src={getImageUrl(movie.poster_path, 'w92')}
                          alt={movie.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-white font-medium truncate">{movie.title}</h4>
                        <p className="text-gray-400 text-xs">
                          {new Date(movie.release_date).getFullYear()} • {movie.genres?.[0]?.name}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="p-2 bg-gray-700/50">
                <button
                  className="w-full py-2 text-center text-sm text-white hover:text-red-400 transition-colors"
                  onClick={handleSearch}
                >
                  See all results for "{query}"
                </button>
              </div>
            </>
          ) : (
            <div className="p-4 text-center text-gray-400">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;