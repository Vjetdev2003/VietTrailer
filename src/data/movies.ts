import { TMDBMovie, TMDBCast } from '../services/tmdb';

export interface Movie extends TMDBMovie {
  cast: Cast[];
  director?: string;
  trailerKey?: string;
}

export interface Cast extends TMDBCast {}

export interface Genre {
  id: number;
  name: string;
}

export const genres: Genre[] = [
  { id: 28, name: 'Hành động' },
  { id: 12, name: 'Phiêu lưu' },
  { id: 16, name: 'Hoạt hình' },
  { id: 35, name: 'Hài' },
  { id: 80, name: 'Tội phạm' },
  { id: 18, name: 'Chính kịch' },
  { id: 10751, name: 'Gia đình' },
  { id: 14, name: 'Huyền ảo' },
  { id: 36, name: 'Lịch sử' },
  { id: 27, name: 'Kinh dị' },
  { id: 10402, name: 'Âm nhạc' },
  { id: 9648, name: 'Bí ẩn' },
  { id: 10749, name: 'Lãng mạn' },
  { id: 878, name: 'Khoa học viễn tưởng' },
  { id: 53, name: 'Giật gân' },
  { id: 10752, name: 'Chiến tranh' },
  { id: 37, name: 'Miền Tây' }
];