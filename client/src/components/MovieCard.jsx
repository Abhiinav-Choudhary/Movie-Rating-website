const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-[48%] md:w-[31%] lg:w-[23%]">
      {/* Poster */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-52 sm:h-60 md:h-72 object-cover"
      />

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-bold truncate">{movie.title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">⭐ {movie.rating}</p>
      </div>
    </div>
  );
};

export default MovieCard;
