import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Replace with your TMDB API key
const API_KEY = "f91bce334467bd36e93de5b707026c12";

export default function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 9;

  // Fetch 100 movies (5 pages × 20 movies per page)
  useEffect(() => {
    const fetchMovies = async () => {
      let allMovies = [];
      for (let page = 1; page <= 5; page++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        const data = await response.json();
        allMovies = [...allMovies, ...data.results];
      }
      setMovies(allMovies);
    };

    fetchMovies();
  }, []);

  // Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navbar isAuth={true} />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 mt-10">
        <h2 className="text-3xl font-bold mb-8">🎬 Explore Movies</h2>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {currentMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition cursor-pointer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex flex-col justify-between h-36">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-yellow-400 font-medium">
                  ⭐ {movie.vote_average}/10
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
          >
            Prev
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
