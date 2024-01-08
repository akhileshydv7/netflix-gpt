import { useEffect } from 'react';
import { API_options } from '../Utils/Constants'
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideos } from '../Utils/moviesSlice';


const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const trailerVideo = useSelector(store => store.movies.trailerVideo);



    useEffect(() => {
        const getMoviesVideos = async () => {
            const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US", API_options);
            const json = await data.json();
            // console.log(json);

            const filterData = json.results.filter((video) => video.type === "Trailer");
            const trailer = filterData.length ? filterData[0] : json.results[0];
            dispatch(addTrailerVideos(trailer));
        }
        if (!trailerVideo) getMoviesVideos();
    }, [movieId, dispatch, trailerVideo]);
}

export default useMovieTrailer;