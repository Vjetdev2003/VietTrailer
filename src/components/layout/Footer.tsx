import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Twitter, Instagram, Facebook, Youtube, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Film className="h-6 w-6 text-red-500" />
              <span className="text-xl font-bold text-white">VietTrailer</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              Điểm đến cuối cùng của bạn để khám phá và tìm hiểu về phim. Nhận thông tin, trailer và nhiều nội dung khác cho những bộ phim yêu thích của bạn.
            </p>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/genre/28" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Phim Hành động
                </Link>
              </li>
              <li>
                <Link to="/genre/35" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Phim Hài
                </Link>
              </li>
              <li>
                <Link to="/genre/18" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Phim Drama
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Thể loại</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/genre/878" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Khoa học viễn tưởng
                </Link>
              </li>
              <li>
                <Link to="/genre/27" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Kinh dị
                </Link>
              </li>
              <li>
                <Link to="/genre/10749" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Lãng mạn
                </Link>
              </li>
              <li>
                <Link to="/genre/53" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Thriller
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Kết nối với chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} VietTrailer. Bảo lưu mọi quyền.
          </p>
          <div className="flex items-center mt-4 md:mt-0 text-sm text-gray-400">
            <span>Được làm bằng</span>
            <Heart className="h-4 w-4 text-red-500 mx-1" />
            <span>bởi những người yêu điện ảnh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;