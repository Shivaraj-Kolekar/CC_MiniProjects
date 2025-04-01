import React, { useState } from "react";
import { Search, Loader2, SearchIcon, Camera, FilmIcon } from "lucide-react";
import MovieCard from "./components/MovieCard";
import { searchMovies } from "./api/omdb";
import type { Movie } from "./types";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {" "}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl flex justify-center items-center font-bold text-center">
          <span>
            <FilmIcon className="mr-4" size={42}></FilmIcon>
          </span>
          Rapid Movie Search Engine
        </h1>
        <p className="text-center mt-2 mb-8 text-lg text-gray-300 ">
          Ready for your next cinematic adventure?
        </p>{" "}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies..."
              className="w-full px-4 py-3 pl-12 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Search
            </button>
          </div>
        </form>
        {loading && (
          <div className="flex flex-col justify-center items-center">
            <Loader2 className="animate-spin" size={48} />
            <h1 className="text-xl font-semibold">Searching the movies...</h1>
          </div>
        )}
        {error && <div className="text-red-500 text-center mb-8">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
        {!loading && !error && movies.length === 0 && query && (
          <div className="text-center text-gray-400">
            No movies found. Try a different search term.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
