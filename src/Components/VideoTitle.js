import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='pt-[16%] px-20 w-full aspect-video absolute text-white bg-gradient-to-r from-black'>
            <h1 className='font-bold text-3xl'>{title}</h1>
            <p className='pt-3 w-1/4 text-sm'>{overview}</p>
            <div className='pt-3'>
                <button className='mr-2 px-6 py-2 text-black bg-white font-bold rounded-md hover:bg-opacity-80'>Play</button>
                <button className='px-6 py-2 bg-gray-500 text-white font-bold opacity-75 rounded-md'>More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle;