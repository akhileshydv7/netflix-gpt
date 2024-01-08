import React from 'react'
import GPTSearchBar from './GPTSearchBar';
import { netflixBackground } from '../Utils/Constants';
import GPTMoviesSuggestions from './GPTMoviesSuggestions';

const GPTSearch = () => {
    return (
        <div>
            <div className='fixed -z-20'>
                <img src={netflixBackground}
                    alt='logo'
                />
            </div>
            <GPTSearchBar />
            <GPTMoviesSuggestions />
        </div>
    )
}

export default GPTSearch;