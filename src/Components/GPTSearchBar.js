import { useRef } from "react";
import { lang } from "../Utils/languageConstants"
import { useSelector, useDispatch } from "react-redux";
import openai from "../Utils/openAi";
import { API_options } from "../Utils/Constants";
import { addGptMoviesResults } from "../Utils/gptSlice";

const GPTSearchBar = () => {
    const language = useSelector((store) => store.config.lang);
    const searchText = useRef(null);
    const dispatch = useDispatch();

    const searchMovieTMDB = async (movie) => {
        const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_options);
        const json = await data.json();

        return json.results;
    }

    const handleGPTSearchClick = async () => {
        const gtpQuery = "Act as a Movie Recommendation system and suggest some movie for the query : " + searchText.current.value + ". Only gives me names of 5 movies, comma seperated like the example result given ahead. Example Result: Chup Chup Ke, Andhadhun, Don, Dhoom, Bhool Bhulaiyaa";

        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gtpQuery }],
            model: 'gpt-3.5-turbo',
        });

        if (!gptResults) {
            <h1>oops</h1>
        }

        const gtpMovies = gptResults?.choices?.[0].message?.content.split(",");

        const promiseArray = gtpMovies.map((movie) => searchMovieTMDB(movie));
        const tmbdResults = await Promise.all(promiseArray);

        dispatch(
            addGptMoviesResults({ movieNames: gtpMovies, movieResults: tmbdResults })
        );

    }

    return (
        <div className='pt-[10%] flex justify-center'>
            <form className='w-1/2 bg-black grid grid-cols-12 rounded-2xl opacity-90' onSubmit={(e) => e.preventDefault()}>
                <input className='p-4 m-4 col-span-9 rounded-lg' ref={searchText}
                    type="text" placeholder={lang[language].gptSearchPlaceholder}
                />
                <button className='col-span-3 px-4 py-4 m-4 text-lg bg-red-700 text-white rounded-lg'
                    onClick={handleGPTSearchClick}>
                    {lang[language].search}
                </button>
            </form>
        </div>
    )
}

export default GPTSearchBar