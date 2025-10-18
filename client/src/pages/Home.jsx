import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_KEY = "f91bce334467bd36e93de5b707026c12";

export default function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 9;

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

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Navbar */}
      <Navbar isAuth={true} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 mt-14 sm:mt-16">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-10 text-center sm:text-left">
          🎬 Explore Movies
        </h2>

        {/* Movies Grid */}
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-5 
            sm:gap-6 
            md:gap-8
          "
        >
          {currentMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="
                bg-gray-900 
                border border-gray-700 
                rounded-xl 
                shadow-lg 
                overflow-hidden 
                hover:scale-105 
                transition-transform 
                cursor-pointer
              "
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-56 sm:h-64 md:h-72 object-cover"
              />
              <div className="p-3 sm:p-4 flex flex-col justify-between h-28 sm:h-36">
                <h3 className="text-base sm:text-lg font-semibold line-clamp-2">
                  {movie.title}
                </h3>
                <p className="text-yellow-400 font-medium text-sm sm:text-base mt-1">
                  ⭐ {movie.vote_average}/10
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mt-8 sm:mt-12">
          {/* Prev Button */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="
              px-3 sm:px-4 py-2 
              bg-gray-700 
              rounded-lg 
              hover:bg-gray-600 
              disabled:opacity-50
              text-sm sm:text-base
            "
          >
            Prev
          </button>

          {/* Page Numbers */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`
                  px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-sm sm:text-base transition
                  ${
                    currentPage === i + 1
                      ? "bg-yellow-400 text-black font-semibold"
                      : "bg-gray-700 hover:bg-gray-600"
                  }
                `}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="
              px-3 sm:px-4 py-2 
              bg-gray-700 
              rounded-lg 
              hover:bg-gray-600 
              disabled:opacity-50
              text-sm sm:text-base
            "
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
