import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        favorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
    };

    // Use a local fallback image or SVG
    const fallbackImage = (
        <div className="poster-fallback">
            <svg width="500" height="750" viewBox="0 0 500 750">
                <rect width="500" height="750" fill="#ddd" />
                <text x="50%" y="50%" fill="#666" textAnchor="middle" dominantBaseline="middle">
                    No Poster
                </text>
            </svg>
        </div>
    );

    return (
        <div className="movie-card">
            <div className="movie-poster">
                {movie.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        onError={(e) => {
                            e.target.replaceWith(fallbackImage);
                        }}
                        loading="lazy"
                    />
                ) : (
                    fallbackImage
                )}
                <div className="movie-overlay">
                    <button
                        className={`favorite-btn ${favorite ? "active" : ""}`}
                        onClick={handleFavoriteClick}
                        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3 title={movie.title}>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0] || 'Unknown year'}</p>
            </div>
        </div>
    );
}

export default MovieCard;