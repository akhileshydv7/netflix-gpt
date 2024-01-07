import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../Utils/Validate';
// import { logDOM } from '@testing-library/react';
import { Avatar, netflixBackground } from '../Utils/Constants';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser } from '../Utils/userSlice';
import { useDispatch } from 'react-redux';


const Login = () => {
    const [staySignIn, setStaySignIn] = useState(true);
    const [validateMessage, setValidateMessage] = useState(null);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUP = () => {
        setStaySignIn(!staySignIn);
    }

    const handleButtonClick = () => {
        const message = checkValidateData(email.current.value, password.current.value);
        setValidateMessage(message);
        // console.log(message);
        if (message) return;

        if (!staySignIn) {
            // Sign Up 
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: { Avatar },
                    }).then(() => {
                        // Profile updated!
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                        navigate("/browse");
                    }).catch((error) => {
                        // An error occurred
                        // ...

                    });

                    // console.log(user);
                    navigate("/browse");
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                    // console.log(errorCode + "-" + errorMessage);
                });
        } else {
            // Signed in 
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // const user = userCredential.user;
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                    // console.log(errorMessage);
                    setValidateMessage("Invalid Email/Password");
                });
        }
    }


    return (
        <div className=''>
            <Header />
            <div className='absolute '>
                <img src={netflixBackground}
                    alt='logo'
                />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='absolute bg-opacity-90 bg-black w-4/12 p-12 mx-auto my-24 right-0 left-0 text-white'>
                <h1
                    className='text-4xl mx-1 my-4 font-semibold'>
                    {staySignIn ? "Sign In" : "Sign Up"}
                </h1>

                {!staySignIn && <input
                    ref={name}
                    className='p-4 mx-1 mt-4 mb-1 bg-gray-700 w-full rounded-md'
                    placeholder='Full Name'
                    type='text'
                    required
                />}

                <input
                    ref={email}
                    className='p-4 mx-1 mt-4 mb-1 bg-gray-700 w-full rounded-md'
                    placeholder='Email or phone number'
                    type='email'
                    required
                />

                <input
                    ref={password}
                    className='p-4 my-4 mx-1 bg-gray-700 w-full rounded-md'
                    placeholder='Password'
                    type='password'
                    required
                />

                <p className="mx-1 font-semibold text-lg text-red-700">{validateMessage}</p>


                <button
                    onClick={handleButtonClick}
                    className='p-4 mx-1 my-8 w-full bg-red-700 rounded-md'>
                    {staySignIn ? "Sign In" : "Sign Up"}
                </button>

                <p
                    className='my-4 mx-1'
                    onClick={handleSignUP}
                >
                    New to Netflix?
                    <span
                        className='cursor-pointer text-blue-600'>
                        {staySignIn ? " Sign In" : " Sign Up"} now.
                    </span>
                </p>
                {/* <p
                    className='my-4 mx-1 text-sm'>
                    This page is protected by Google reCAPTCHA to ensure you're not a bot.
                </p> */}
            </form>
        </div>
    )
}

export default Login;