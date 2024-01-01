import { Avatar, LOGO_URL } from '../Utils/Constants'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../Utils/firebase';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { addUser, removeUser } from '../Utils/userSlice';
import { useDispatch } from "react-redux";


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
    }, []);
    return (
        <div className='absolute flex justify-between px-8 py-2 w-full bg-gradient-to-b from-black z-10'>
            <img className='w-48' src={LOGO_URL}
                alt="logo"
            />
            {
                (user && <div className='flex p-2'>
                    <img className='w-12 h-12 pt-3' src={Avatar}
                        alt="usericon" />
                    <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
                </div>)
            }

        </div>
    )
}

export default Header