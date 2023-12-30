import { Avatar, LOGO_URL } from '../Utils/Constants'
import { signOut } from 'firebase/auth';
import { auth } from '../Utils/firebase';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user)
    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
        }).catch((error) => {
            // An error happened.
            navigate("/error");
        });
    }
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