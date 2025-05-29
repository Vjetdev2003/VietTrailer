import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Film } from 'lucide-react';
import { genres } from '../../data/movies';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-gray-900/95 shadow-lg backdrop-blur-sm' : 'bg-gradient-to-b from-gray-900/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">
              VietTrailer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-red-400 transition-colors">
              Trang chủ
            </Link>
            <div className="group relative">
              <button className="text-white hover:text-red-400 transition-colors flex items-center">
                Thể loại
              </button>
              <div className="absolute left-0 top-full w-48 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-2 grid grid-cols-1 gap-1 max-h-96 overflow-y-auto">
                  {genres.map((genre) => (
                    <Link
                      key={genre.id}
                      to={`/genre/${genre.id}`}
                      className="px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition-colors"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Search */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm phim..."
                className="bg-gray-800 text-white rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 shadow-xl">
          <div className="px-4 py-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm phim..."
                className="bg-gray-800 text-white rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>
          </div>
          <div className="px-4 py-2 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Trang chủ
            </Link>
            <div className="block px-3 py-2 text-white">
              Thể loại
            </div>
            <div className="pl-6 space-y-1 max-h-64 overflow-y-auto">
              {genres.map((genre) => (
                <Link
                  key={genre.id}
                  to={`/genre/${genre.id}`}
                  className="block px-3 py-1 text-sm text-white hover:bg-gray-800 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;