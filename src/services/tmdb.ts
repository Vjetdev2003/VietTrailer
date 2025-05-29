const API_KEY = '68b011186dea77f0a130858da50ea0ec';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
}

export interface TMDBCast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  type: string;
}

const fetchTMDB = async (endpoint: string, params: Record<string, string | number> = {}, language: string = 'en-US') => {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    language: language,
    ...params,
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data from TMDB');
  }

  return response.json();
};

export const getImageUrl = (path: string | null, size: string = 'original'): string => {
  if (!path) {
    return 'https://images.pexels.com/photos/3921045/pexels-photo-3921045.jpeg'; // Fallback image
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getTrendingMovies = (page: number = 1) => fetchTMDB('/trending/movie/week', { page: page.toString() }, 'vi');

export const getPopularMovies = (page: number = 1) => fetchTMDB('/movie/popular', { page: page.toString() }, 'vi');

export const getTopRatedMovies = (page: number = 1) => fetchTMDB('/movie/top_rated', { page: page.toString() }, 'vi');

export const getMovieDetails = async (id: number) => {
  const [movie, credits, videos] = await Promise.all([
    fetchTMDB(`/movie/${id}`, {}, 'vi'),
    fetchTMDB(`/movie/${id}/credits`),
    fetchTMDB(`/movie/${id}/videos`),
  ]);

  const trailer = videos.results.find(
    (video: TMDBVideo) => video.type === 'Trailer'
  );

  console.log('Fetched trailer:', trailer);

  return {
    ...movie,
    cast: credits.cast,
    director: credits.crew.find((person: { job: string }) => person.job === 'Director')?.name,
    trailerKey: trailer?.key,
  };
};

export const searchMovies = (query: string, page: number = 1) => 
  fetchTMDB('/search/movie', { query, page: page.toString() }, 'vi');

export const getMoviesByGenre = (genreId: number, page: number = 1) =>
  fetchTMDB('/discover/movie', { with_genres: genreId.toString(), page: page.toString() }, 'vi');

export const getDiscoverMovies = (page: number = 1, sortBy: string = 'popularity.desc') =>
  fetchTMDB('/discover/movie', { page: page.toString(), sort_by: sortBy }, 'vi');

export const getGenres = () => fetchTMDB('/genre/movie/list', {}, 'vi');