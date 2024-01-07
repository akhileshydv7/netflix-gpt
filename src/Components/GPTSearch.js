import React from 'react'
import GPTSearchBar from './GPTSearchBar';
import { netflixBackground } from '../Utils/Constants';

const GPTSearch = () => {
    return (
        <div>
            <div className='absolute -z-20'>
                <img src={netflixBackground}
                    alt='logo'
                />
            </div>
            <GPTSearchBar />
        </div>
    )
}

export default GPTSearch;