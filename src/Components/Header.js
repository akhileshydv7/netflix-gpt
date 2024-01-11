import { Avatar, LOGO_URL, SUPPORTED_LANGUAGES } from '../Utils/Constants'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../Utils/firebase';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { addUser, removeUser } from '../Utils/userSlice';
import { useDispatch } from "react-redux";
import { toogleGptSearch } from '../Utils/gptSlice';
import { changeLanguage } from '../Utils/configSlice';

const Header = () => {
    const [navColor, setNavColor] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
    const user = useSelector(store => store.user)
    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            navigate("/error");
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, [dispatch, navigate]);

    const handleGPTSearchClick = () => {
        dispatch(toogleGptSearch());
    };
    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    }

    const headerScrollChange = () => {
        if (window.scrollY >= 90) {
            setNavColor(true);
        } else {
            setNavColor(false);
        }
    }
    window.addEventListener('scroll', headerScrollChange);

    const navbarClassName = "fixed flex justify-between px-8 py-2 w-full bg-gradient-to-b from-black z-40 h-15";
    const navbarScroll = "fixed flex justify-between px-8 py-2 w-full bg-gradient-to-b from-black z-40 bg-black h-15";
    return (
        // 
        <div className={navColor ? `${navbarScroll}` : `${navbarClassName}`}>
            <img className='ml-2 w-28 mb-6' src={LOGO_URL}
                alt="logo"
            />
            {
                user && (<div className='flex p-2'>
                    {
                        showGptSearch && (
                            <select className='px-2 my-2 mb-3 mt-4 bg-gray-900 text-white rounded-lg cursor-pointer' onChange={handleLanguageChange}>
                                {SUPPORTED_LANGUAGES.map((lang) =>
                                    <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                                )}
                            </select>)
                    }
                    <button className='px-3 mx-3 mt-4 mb-3 text-white rounded-lg bg-purple-800'
                        onClick={handleGPTSearchClick}>
                        {showGptSearch ? "Home" : "GPT Search"}
                    </button>
                    <img className='w-8 h-10 pt-2 mt-1' src={Avatar}
                        alt="usericon" />
                    <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
                </div>)
            }

        </div>
    )
}

export default Header