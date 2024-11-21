import React, { useEffect, useRef, useState } from 'react'
import { checkValidForm } from '../utils/ValidForm';
import { Link, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import image from "../utils/Pictures/image.png"
import Header from './Header';
const Login = () => {
  const [isSignInForm,setisSignInForm]=useState(true);
  const [errMessage,setErrMessage]=useState(null)
  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleClick=(e)=>{
    

     if(!isSignInForm){
      const message=checkValidForm(email.current.value,password.current.value);
      setErrMessage(message);
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        console.log("Mishra");
        navigate("/chatrooms");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    }else{
signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    navigate("/chatrooms");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
      
    }
    
  }
  const signInToggle=()=>{
    setisSignInForm(!isSignInForm);

    }

  
   

    
   useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName,photoURL}= auth.currentUser;
        dispatch(addUser({uid:uid,email:email}));
       
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });
   },[])
  return (
    <div className='m-0'>
     <Header/> 
    <div className='absolute object-cover w-screen '>
       <img src={image} alt='background'/>
       </div>
   
    <form className='absolute bg-black p-12 w-3/12 my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-md'>

    {!isSignInForm && <input  type='text' placeholder='Name'className='bg-gray-800 p-2 my-2 w-full text-xs ' />}
    <input ref={email} type='text' placeholder='Email Address'className='bg-gray-800 p-2 my-2 w-full text-xs ' />
    <input ref={password} type="password" placeholder="Password" className='bg-gray-800 p-2 my-2 w-full text-xs' />
   
     <Link to={""}><button className='bg-blue-700 my-4 w-full p-2 rounded-md' onClick={handleClick}>
       Sign in
     </button></Link>
     <p className='text-xs text-red-500 font-bold py-2'>{errMessage}</p>
      <p className='cursor-pointer' onClick={signInToggle} >
       {isSignInForm?("New to chatRoom"):("Already registered")}
      </p>

    </form>
    </div>
    
 
  )
}

export default Login
