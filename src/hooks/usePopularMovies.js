import { useEffect } from 'react';
import { API_options } from '../Utils/Constants'
import { useDispatch } from "react-redux";
import { addPopularMovies } from '../Utils/moviesSlice';

const usePopularMovies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getPopularMovies = async () => {
            const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_options);
            const json = await data.json();
            // console.log(json.results);
            dispatch(addPopularMovies(json.results));
        }
        getPopularMovies();
    }, [dispatch]);
};

export default usePopularMovies;