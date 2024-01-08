import { useEffect } from 'react';
import { API_options } from '../Utils/Constants'
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from '../Utils/moviesSlice';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

    useEffect(() => {
        const getNowPlayingMovies = async () => {
            const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_options);
            const json = await data.json();
            dispatch(addNowPlayingMovies(json.results));
        }
        if (!nowPlayingMovies) getNowPlayingMovies();
    }, [dispatch, nowPlayingMovies]);
};

export default useNowPlayingMovies;