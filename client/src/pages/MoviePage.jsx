import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const API_KEY = "f91bce334467bd36e93de5b707026c12";

// ⭐ Star Rating Component
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 10; i++) {
    stars.push(
      <span
        key={i}
        className={`text-xl ${i <= Math.round(rating) ? "text-yellow-400" : "text-gray-600"}`}
      >
        ★
      </span>
    );
  }
  return <div className="flex justify-center mb-2">{stars}</div>;
};

export default function MoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState("");
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  // Fetch movie details from TMDB
  const fetchMovie = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      if (!res.ok) throw new Error("Failed to fetch movie details");
      const data = await res.json();
      setMovie({
        title: data.title,
        poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        rating: data.vote_average,
        desc: data.overview,
      });

      // Fetch trailer
      const trailerRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const trailerData = await trailerRes.json();
      const ytTrailer = trailerData.results.find(
        (vid) => vid.site === "YouTube" && vid.type === "Trailer"
      );
      if (ytTrailer)
        setTrailer(
          `https://www.youtube.com/embed/${ytTrailer.key}?autoplay=1&mute=1`
        );
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load movie details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  // Compute average rating including user reviews
  const averageRating =
    reviews.length > 0
      ? ((movie.rating * 10 + reviews.reduce((a, r) => a + r.rating, 0)) /
          (reviews.length + 1)).toFixed(1)
      : movie?.rating?.toFixed(1);

  // ⭐ Handle rating submission
  const handleRate = () => {
    if (review.trim().split(/\s+/).filter(Boolean).length > 150) {
      toast.error("Your review exceeds 150 words!");
      return;
    }

    if (review.trim().length === 0) {
      toast.error("Please write a short reason for your rating!");
      return;
    }

    const newReview = { rating: parseFloat(rating), review: review.trim() };
    setReviews([...reviews, newReview]);

    toast.success(`You rated "${movie.title}" ${rating}/10!`);

    setShowPopup(false);
    setReview("");
    setRating(5);
  };

  if (loading || !movie)
    return <p className="text-white text-center mt-20">Loading...</p>;

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden"
      style={{
        backgroundImage: `url(${movie.poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="absolute top-5 left-5 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition z-20"
      >
        ← Back
      </button>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl w-full bg-gray-900/70 p-10 rounded-3xl shadow-2xl text-center border border-gray-700"
      >
        {/* Poster */}
        <motion.img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-[400px] object-cover rounded-xl mb-6 shadow-lg"
        />

        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-2 text-yellow-400">
          {movie.title}
        </h1>

        {/* Star Rating */}
        <StarRating rating={averageRating} />
        <p className="text-yellow-400 font-semibold mb-4">
          {averageRating}/10 ({reviews.length} review
          {reviews.length !== 1 && "s"})
        </p>

        {/* Description */}
        <p className="text-gray-300 text-lg mb-6">{movie.desc}</p>

        {/* Trailer */}
        {trailer && (
          <motion.iframe
            src={trailer}
            title={`${movie.title} Trailer`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-[400px] rounded-xl shadow-lg mb-6"
          ></motion.iframe>

        )}

        {/* Rate Movie Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPopup(true)}
          className="bg-yellow-400 text-black px-8 py-3 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition"
        >
          ⭐ Rate Movie
        </motion.button>
      </motion.div>

      {/* ⭐ Popup Form Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 text-white rounded-2xl p-8 w-[90%] sm:w-[450px] shadow-xl border border-gray-700 text-center"
            >
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                Rate {movie.title}
              </h2>

              {/* Rating Slider */}
              <label className="block text-gray-300 mb-2 text-left">
                Select Rating: <span className="text-yellow-400">{rating}/10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full accent-yellow-400 cursor-pointer mb-4"
              />

              {/* Review Textarea */}
              <label className="block text-gray-300 mb-2 text-left">
                Reason for your rating (max 150 words):
              </label>
              <textarea
                rows="4"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Describe what you liked or disliked..."
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none mb-4"
              ></textarea>
              <p className="text-sm text-gray-400 text-left mb-4">
                Word count: {review.trim().split(/\s+/).filter(Boolean).length}/150
              </p>

              {/* Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleRate}
                  className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-semibold transition"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
