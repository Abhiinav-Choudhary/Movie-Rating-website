const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={movie.poster} alt={movie.title} className="w-full h-60 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{movie.title}</h3>
        <p className="text-sm text-gray-600">⭐ {movie.rating}</p>
      </div>
    </div>
  );
};

export default MovieCard;
