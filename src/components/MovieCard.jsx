import "../css/MovieCard.css"

function MovieCard({ movie }) {
    function onFavClick() {
        alert("hey")
    }
    return <div className="movie-card">
        <div className="movie-poster">
            <img src={"https://api.themoviedb.org/3" + movie.poster_path} alt={movie.title} />
            <div className="movie-overlay">
                <button className="favorite-btn" onClick={onFavClick}>FAV</button>

            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>

        </div>
    </div>
}
export default MovieCard;