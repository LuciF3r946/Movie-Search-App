import { useState, useEffect, useCallback } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMovies = useCallback(async (query = '') => {
    try {
      setLoading(true);
      const movieData = query.trim() 
        ? await searchMovies(query)
        : await getPopularMovies();
      setMovies(movieData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load movies. Please try again later.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((query) => {
      loadMovies(query);
    }, 500),
    [loadMovies]
  );

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    if (searchQuery.trim()) {
      debouncedSearch(searchQuery);
    } else {
      loadMovies();
    }
    return () => debouncedSearch.cancel();
  }, [searchQuery, debouncedSearch, loadMovies]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadMovies(searchQuery);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form" role="search">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search movies"
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))
          ) : (
            <div className="no-results">
              No movies found. Try a different search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Home.propTypes = {
  // Add any props validation if needed
};

export default Home;