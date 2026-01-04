import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies, getTopRatedMovies, getRecentMovies } from "../services/api";
import FilterMenu from './FilterMenu'

function Home({ favorites = [], toggleFavorite, filter = 'popular', setFilter = () => {} }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const res = await getPopularMovies(1);
        setMovies(res.results || []);
        setPage(res.page || 1);
        setTotalPages(res.total_pages || 1);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  useEffect(() => {
    // fetch when filter prop changes (ignore while searching)
    const load = async () => {
      setLoading(true);
      try {
        let res = { results: [], page: 1, total_pages: 1 };
        if (filter === 'popular') res = await getPopularMovies(1);
        else if (filter === 'top') res = await getTopRatedMovies(1);
        else if (filter === 'recent') res = await getRecentMovies(1);
        setMovies(res.results || []);
        setPage(res.page || 1);
        setTotalPages(res.total_pages || 1);
        setError(null);
      } catch (err) {
        console.log(err);
        setError('Failed to load movies for filter');
      } finally {
        setLoading(false);
      }
    };

    // don't refetch if user is actively searching
    if (!searchQuery.trim()) load();
  }, [filter]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const res = await searchMovies(searchQuery, 1);
      setMovies(res.results || []);
      setPage(res.page || 1);
      setTotalPages(res.total_pages || 1);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loading) return;
    if (page >= totalPages) return;
    const next = page + 1;
    setLoading(true);
    try {
      let res = { results: [] };
      if (searchQuery.trim()) {
        res = await searchMovies(searchQuery, next);
      } else if (filter === 'popular') {
        res = await getPopularMovies(next);
      } else if (filter === 'top') {
        res = await getTopRatedMovies(next);
      } else if (filter === 'recent') {
        res = await getRecentMovies(next);
      }
      setMovies((prev) => [...prev, ...(res.results || [])]);
      setPage(res.page || next);
      setTotalPages(res.total_pages || totalPages);
    } catch (err) {
      console.log(err);
      setError('Failed to load more movies');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 w-full box-border">
      <div className="max-w-4xl mx-auto mb-6 px-4 flex flex-col gap-4">
        <form onSubmit={handleSearch} className="w-full flex gap-4">
        <input
          type="text"
          placeholder="Search for movies..."
          className="flex-1 p-3 rounded bg-gray-700 text-white text-base focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="p-3 px-6 bg-red-600 text-white rounded font-medium hover:bg-red-500 whitespace-nowrap">
          Search
        </button>
        </form>

        {/* Filter hamburger moved to top-right of the grid */}
      </div>

      {error && <div className="text-center text-red-400 mb-4">{error}</div>}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="relative">
          <div className="absolute top-3 right-3 z-40">
            <FilterMenu filter={filter} setFilter={(f) => { setFilter(f); setSearchQuery(''); }} />
          </div>

          <div className="grid gap-6 p-4 w-full grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
            {movies.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
                isFavorite={favorites.some((f) => f.id === movie.id)}
                onFavClick={() => toggleFavorite(movie)}
              />
            ))}
          </div>
        </div>
      )}
      {/* Load more button */}
      {!loading && page < totalPages && (
        <div className="w-full flex justify-center mt-6">
          <button onClick={loadMore} className="px-4 py-2 bg-gray-800 text-white rounded">Load more</button>
        </div>
      )}
    </div>
  );
}

export default Home;
