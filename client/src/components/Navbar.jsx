import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  const { user, logout } = useAuth();
  const isAuth = !!user;

  // Close mobile menu when route changes
  useEffect(() => setMenuOpen(false), [location.pathname]);

  // Add shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close profile menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const NavLink = ({ to, children }) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={
          "block px-3 py-2 rounded-md text-sm font-medium transition " +
          (active ? "text-yellow-400" : "text-gray-200 hover:text-white")
        }
      >
        {children}
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-sm transition-colors ${
        scrolled ? "bg-black/70 border-b border-gray-800 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-yellow-400 flex items-center justify-center text-black text-lg font-bold">
              🎬
            </div>
            <span className="text-xl font-semibold text-white">MovieRating</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-200 hover:text-white focus:outline-none"
          >
            {menuOpen ? (
              // Close Icon (X)
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex md:items-center md:gap-2">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/search">New</NavLink>
            <NavLink to="/discussion">Discussion</NavLink>
          </nav>

          {/* Profile or Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuth ? (
              <>
                <Link
                  to="/signin"
                  className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/home"
                  className="px-4 py-2 rounded-lg border-2 border-yellow-400 text-yellow-400 font-medium hover:bg-yellow-400 hover:text-black transition"
                >
                  Explore
                </Link>
              </>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5"
                >
                  <img
                    src={user?.avatar || `https://i.pravatar.cc/40?u=${user?.id || "guest"}`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-200">{user?.username || "You"}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white/5 backdrop-blur-sm border border-gray-700 rounded-md py-1 shadow-lg">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/5">Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/5">Settings</Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {menuOpen && (
          <div className="md:hidden mt-2 pb-4 border-t border-gray-800">
            <nav className="flex flex-col gap-1 mt-2">
              <NavLink to="/home">Home</NavLink>
              <NavLink to="/search">New</NavLink>
              <NavLink to="/discussion">Discussion</NavLink>
            </nav>

            {!isAuth ? (
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  to="/signin"
                  className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium text-center hover:bg-yellow-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/home"
                  className="px-4 py-2 rounded-lg border-2 border-yellow-400 text-yellow-400 font-medium text-center hover:bg-yellow-400 hover:text-black transition"
                >
                  Explore
                </Link>
              </div>
            ) : (
              <div className="mt-3 flex flex-col gap-1">
                <Link to="/profile" className="block px-3 py-2 text-gray-200 hover:bg-white/5 rounded-md">
                  Profile
                </Link>
                <Link to="/settings" className="block px-3 py-2 text-gray-200 hover:bg-white/5 rounded-md">
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className="text-left w-full px-3 py-2 text-red-400 hover:bg-white/5 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
