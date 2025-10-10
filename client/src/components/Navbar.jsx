// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // ✅ custom hook

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  // ✅ get auth state and logout from context
  const { user, logout } = useAuth();
  const isAuth = !!user;

  // close mobile menu when route changes
  useEffect(() => setMenuOpen(false), [location.pathname]);

  // add shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close profile dropdown when clicking outside
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
          "px-3 py-2 rounded-md text-sm font-medium transition " +
          (active ? "text-yellow-400" : "text-gray-200 hover:text-white")
        }
      >
        {children}
      </Link>
    );
  };

  return (
    <header
      className={
        "fixed top-0 left-0 w-full z-50 backdrop-blur-sm transition-colors " +
        (scrolled
          ? "bg-black/70 border-b border-gray-800 shadow-sm"
          : "bg-transparent")
      }
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

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex md:items-center md:gap-2">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/home?filter=trending">Trending</NavLink>
            <NavLink to="/home?filter=new">New</NavLink>
            <NavLink to="/discussion">Discussion</NavLink>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {!isAuth ? (
              <>
                <Link
                  to="/signin"
                  className="hidden md:inline-flex px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/home"
                  className="hidden md:inline-flex px-4 py-2 rounded-lg border-2 border-yellow-400 text-yellow-400 font-medium hover:bg-yellow-400 hover:text-black transition"
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
                  <span className="hidden sm:inline-block text-sm text-gray-200">
                    {user?.username || "You"}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white/5 backdrop-blur-sm border border-gray-700 rounded-md py-1 shadow-lg">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/5">Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/5">Settings</Link>
                   {/* ✅ use logout from context */}
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
      </div>
    </header>
  );
}
