import { useEffect } from 'react';
import { API_options } from '../Utils/Constants'
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from '../Utils/moviesSlice';

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const upcomingMovies = useSelector(store => store.movies.upcomingMovies);

    useEffect(() => {
        const getUpcomingMovies = async () => {
            const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_options);
            const json = await data.json();
            // console.log(json.results);
            dispatch(addUpcomingMovies(json.results));
        }
        if (!upcomingMovies) getUpcomingMovies();
    }, [dispatch, upcomingMovies]);
};

export default useUpcomingMovies;