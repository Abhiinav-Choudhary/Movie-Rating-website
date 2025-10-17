import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const API_KEY = "f91bce334467bd36e93de5b707026c12";

export default function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a movie name!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&language=en-US`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setMovies(data.results);
      } else {
        setMovies([]);
        toast.error("No movies found!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch movies!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-extrabold text-yellow-400 mb-6">
        🎬 Search Movies
      </h1>

      {/* 🔍 Search Bar */}
      <form
        onSubmit={searchMovies}
        className="flex w-full max-w-2xl bg-gray-800 rounded-full overflow-hidden border border-gray-700 mb-10"
      >
        <input
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow bg-transparent text-white px-6 py-3 outline-none"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black font-semibold px-6 hover:bg-yellow-300 transition"
        >
          Search
        </button>
      </form>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-yellow-400 text-lg font-semibold animate-pulse">
          Fetching movies...
        </div>
      )}

      {/* 🎞️ Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-6xl">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition transform cursor-pointer"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              className="w-full h-[350px] object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-xl font-bold text-yellow-400 mb-2">
                {movie.title}
              </h2>
              <p className="text-gray-400 text-sm line-clamp-3 mb-3">
                {movie.overview || "No description available."}
              </p>
              <p className="text-yellow-300 font-semibold">
                ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && movies.length === 0 && (
        <p className="text-gray-400 mt-10 text-center">
          Start by searching for your favorite movie above 🍿
        </p>
      )}
    </div>
  );
}
