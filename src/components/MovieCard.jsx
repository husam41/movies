function MovieCard({ movie, isFavorite = false, onFavClick = () => {} }) {
        const posterBase = "https://image.tmdb.org/t/p/w500";
        const placeholder = "https://via.placeholder.com/500x750?text=No+Image";
        const posterSrc = movie && movie.poster_path ? posterBase + movie.poster_path : placeholder;

        return (
            <div className="rounded-lg overflow-hidden bg-gray-800 transition-transform transform hover:-translate-y-1 flex flex-col h-full">
                <div className="relative aspect-[2/3] w-full">
                    <img src={posterSrc} alt={movie?.title || 'Movie poster'} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 hover:opacity-100 transition flex flex-col justify-end p-4">
                        <button
                            className={`absolute top-4 right-4 text-xl p-2 rounded-full w-10 h-10 flex items-center justify-center ${isFavorite ? 'bg-red-600 text-white' : 'bg-black/50 text-white'} hover:opacity-90`}
                            onClick={() => onFavClick(movie)}
                            aria-pressed={isFavorite}
                            aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
                        >
                            ♥
                        </button>
                    </div>
                </div>
                <div className="p-4 flex-1 flex flex-col gap-2">
                    <h3 className="text-base text-white m-0">{movie?.title}</h3>
                    <p className="text-gray-400 text-sm">{movie?.release_date}</p>
                </div>
            </div>
        );
}

export default MovieCard;