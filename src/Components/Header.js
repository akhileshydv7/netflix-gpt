import React from 'react'
import { LOGO_URL } from '../Utils/Constants'

const Header = () => {
    return (
        <div className='absolute flex justify-between px-8 py-2 w-fit bg-gradient-to-b from-black z-10'>
            <img className='w-48' src={LOGO_URL}
                alt="logo"
            />
        </div>
    )
}

export default Header