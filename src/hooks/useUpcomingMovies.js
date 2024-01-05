import { useEffect } from 'react';
import { API_options } from '../Utils/Constants'
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from '../Utils/moviesSlice';

const useUpcomingMovies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getUpcomingMovies = async () => {
            const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_options);
            const json = await data.json();
            // console.log(json.results);
            dispatch(addUpcomingMovies(json.results));
        }
        getUpcomingMovies();
    }, [dispatch]);
};

export default useUpcomingMovies;