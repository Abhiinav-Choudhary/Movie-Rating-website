// src/pages/Profile.jsx
import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-lg">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center">
      <Navbar isAuth={true} />

      <main className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl w-full max-w-2xl p-10 mt-30 ">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12">
          <img
            src={user.avatar || "https://i.pravatar.cc/150"}
            alt={user.username}
            className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-lg"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-gray-400">{user.email}</p>
            <p className="mt-2 text-gray-300">{user.bio || "No bio yet."}</p>
            <p className="mt-1 text-sm text-gray-500">
              Joined:{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>
        </div>

        {/* Rated Movies */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">⭐ Your Ratings</h2>
          {user.ratedMovies && user.ratedMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {user.ratedMovies.map((movie) => (
                <div
                  key={movie._id}
                  className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition transform"
                >
                  <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                  <span className="text-yellow-400 font-bold text-xl">
                    {movie.rating}/10
                  </span>
                  <p className="text-gray-300 text-sm mt-2">{movie.review}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">You haven’t rated any movies yet.</p>
          )}
        </section>

        {/* Edit Profile */}
        <div className="mt-8 flex justify-center">
          <button className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-2xl hover:bg-yellow-300 transition">
            Edit Profile
          </button>
        </div>
      </main>
    </div>
  );
}
