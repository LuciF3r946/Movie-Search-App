import { createContext, useState, useContext, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem("favorites");
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = useCallback((movie) => {
    setFavorites(prev => [...prev, movie]);
  }, []);

  const removeFromFavorites = useCallback((movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  }, []);
  
  const isFavorite = useCallback((movieId) => {
    return favorites.some(movie => movie.id === movieId);
  }, [favorites]);

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired
};