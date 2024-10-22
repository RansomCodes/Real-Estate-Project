import React from "react";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from 'react-router-dom';

function Oauth() {  
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleGoogleClick=async ()=>{
        try {
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const res=await signInWithPopup(auth,provider);
            const data= await fetch('/api/auth/google',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: res.user.displayName,
                    email: res.user.email,
                    photo: res.user.photoURL
                }),
            })
            const result=await data.json();
            dispatch(signInSuccess(result));
            navigate('/');
        } catch (error) {
            console.log("Could not sign in with google");
        }
    }

    return (
        <button
        onClick={handleGoogleClick}
        type="button"
        className="bg-red-700 text-white p-2 rounded-lg uppercase hover:opacity-95"
        >
        Continue with google
        </button>
    );
}

export default Oauth;
