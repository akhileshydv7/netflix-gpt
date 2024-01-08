import { useEffect } from 'react';
import { API_options } from '../Utils/Constants'
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from '../Utils/moviesSlice';

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector(store => store.movies.popularMovies);

    useEffect(() => {
        const getPopularMovies = async () => {
            const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_options);
            const json = await data.json();
            dispatch(addPopularMovies(json.results));
        }
        if (!popularMovies) getPopularMovies();
    }, [dispatch, popularMovies]);
};

export default usePopularMovies;