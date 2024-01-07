import React from 'react'
import { TMDB_IMG_URL } from '../Utils/Constants'

const MovieCard = ({ posterPath }) => {
    return (
        <div className='w-40 pr-4 transition-all duration-150 hover:scale-95'>
            <img alt='Movies poster'
                src={TMDB_IMG_URL + posterPath}
            />
        </div>
    )
}

export default MovieCard