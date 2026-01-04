import MovieCard from "./MovieCard";

function Favorites({ favorites = [], toggleFavorite }){
  if (!favorites || favorites.length === 0) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-lg mx-auto bg-white/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl text-red-600 mb-4">no favorit movies yet</h2>
          <p className="text-gray-400">start adding to favorites</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 w-full box-border">
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid gap-6 p-4 w-full grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={true}
              onFavClick={() => toggleFavorite(movie)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Favorites;
