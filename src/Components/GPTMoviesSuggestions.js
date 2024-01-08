import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMoviesSuggestions = () => {
    const { movieNames, movieResults } = useSelector((store) => store.gpt);
    if (!movieNames) return null;

    return (
        <div className="p-4 mt-4 bg-black text-white bg-opacity-80">
            <div>
                {movieNames.map((movieName, index) =>
                    <MovieList key={movieName} title={movieName} movies={movieResults[index]} />)}
            </div>
        </div>
    )
}

export default GPTMoviesSuggestions;