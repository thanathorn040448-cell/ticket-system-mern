import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../apiUrl';
import logoImg from '../assets/LOGO.png';

export const Header: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  {
    {
      user?.role === "admin" && (
        <Link
          to="/admin/events"
          className="text-red-400 ml-4"
        >
          Admin Panel
        </Link>
      )
    }
  }

  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  // ⭐ Search states
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  // ปิด dropdown เมื่อคลิกนอกเมนู
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenu(false);
      setShowResults(false);
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // ⭐ Search API
  useEffect(() => {

    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {

      fetch(`${API_URL}/events/search/${query}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setResults(data);
            setShowResults(true);
          }
        })
        .catch(err => console.error(err));

    }, 300);

    return () => clearTimeout(timer);

  }, [query]);

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/signup';

  if (isAuthPage) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="Ticky Ticku Ticket Logo" className="w-10 h-10 object-contain rounded-full" />
          <span className="text-xl font-bold text-white">Ticky Ticku Ticket</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">

          <Link
            to="/concerts"
            className="text-sm font-medium text-gray-400 hover:text-blue-400 transition-colors"
          >
            คอนเสิร์ต
          </Link>

          <Link
            to="/artists"
            className="text-sm font-medium text-gray-400 hover:text-blue-400 transition-colors"
          >
            ศิลปิน
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin/events">
              Admin Panel
            </Link>
          )}

        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <div className="relative hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-64">

            <Search className="w-4 h-4 text-gray-500" />

            <input
              type="text"
              placeholder="ค้นหา..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={(e) => {
                e.stopPropagation();
                setShowResults(true);
              }}
              className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 text-white"
            />

            {/* SEARCH DROPDOWN */}
            {showResults && results.length > 0 && (

              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-12 left-0 w-full bg-[#121212] border border-white/10 rounded-xl shadow-xl overflow-hidden"
              >

                {results.map((event) => (

                  <Link
                    key={event._id}
                    to={`/events/${event._id}/seats`}
                    onClick={() => {
                      setShowResults(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-white/5"
                  >

                    <img
                      src={event.images}
                      className="w-10 h-10 rounded-md object-cover"
                    />

                    <div className="flex-1">

                      <p className="text-white text-sm font-semibold">
                        {event.eventname}
                      </p>

                      <p className="text-gray-400 text-xs">
                        {event.location}
                      </p>

                    </div>

                  </Link>

                ))}

                <div className="border-t border-white/10 p-3 text-xs text-blue-400">
                  ดูผลการค้นหาทั้งหมดสำหรับ "{query}"
                </div>

              </div>

            )}

          </div>

          <button className="p-2 text-gray-400 hover:text-blue-400">
            <Bell className="w-5 h-5" />
          </button>

          {/* Auth Section */}
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm"
            >
              เข้าสู่ระบบ
            </Link>
          ) : (
            <div className="flex items-center gap-4 relative">

              {/* USERNAME + DROPDOWN */}
              <div className="relative">

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(!openMenu);
                  }}
                  className="text-white font-semibold flex items-center gap-1"
                >
                  {user.username} ▼
                </button>

                {openMenu && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-3 w-48 bg-[#121212] border border-white/10 rounded-xl shadow-xl"
                  >

                    <button
                      onClick={() => {
                        navigate("/tickets");
                        setOpenMenu(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-white hover:bg-white/5"
                    >
                      ประวัติการซื้อตั๋ว
                    </button>

                    <button
                      onClick={() => {
                        navigate("/profile");
                        setOpenMenu(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-white hover:bg-white/5"
                    >
                      โปรไฟล์
                    </button>

                  </div>
                )}

              </div>

              {/* LOGOUT */}
              <button
                onClick={logout}
                className="text-red-500"
              >
                Logout
              </button>

            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/signup';

  if (isAuthPage) return null;

  return (
    <footer className="bg-[#050505] border-t border-white/10 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <span className="text-white font-bold">
            ThaiTicket Hub
          </span>
        </div>

        <p className="text-xs text-gray-500">
          © 2026 ThaiTicket Hub
        </p>

        <button className="p-2 bg-white/5 rounded-full border border-white/10">
          <Globe className="w-4 h-4 text-gray-400" />
        </button>

      </div>
    </footer>
  );
};