import { useEffect } from 'react';
import { API_options } from '../Utils/Constants'
import { useDispatch } from "react-redux";
import { addTrailerVideos } from '../Utils/moviesSlice';
const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const getMoviesVideos = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US", API_options);
        const json = await data.json();

        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        // console.log(trailer);
        dispatch(addTrailerVideos(trailer));
    }
    useEffect(() => {
        getMoviesVideos();
    },);
}

export default useMovieTrailer;