import { useEffect } from 'react';
import { API_options } from '../Utils/Constants'
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from '../Utils/moviesSlice';

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const topRatedMovies = useSelector(store => store.movies.topRatedMovies);

    useEffect(() => {
        const getTopRatedMovies = async () => {
            const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_options);
            const json = await data.json();
            dispatch(addTopRatedMovies(json.results));
        }
        if (!topRatedMovies) getTopRatedMovies();
    }, [dispatch, topRatedMovies]);
};

export default useTopRatedMovies;