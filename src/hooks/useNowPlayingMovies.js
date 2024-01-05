import { useEffect } from 'react';
import { API_options } from '../Utils/Constants'
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from '../Utils/moviesSlice';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getNowPlayingMovies = async () => {
            const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_options);
            const json = await data.json();
            // console.log(json.results);
            dispatch(addNowPlayingMovies(json.results));
        }
        getNowPlayingMovies();
    }, [dispatch]);
};

export default useNowPlayingMovies;