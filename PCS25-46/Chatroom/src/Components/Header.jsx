import React from 'react'
import {  onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

import  { useEffect } from 'react'




import logo from "../utils/Pictures/logo.png"



const Header = () => {

//   const handleSignOut=()=>{
//     signOut(auth)
//     .then(() => {
//       // Sign-out successful.
//       navigate('/');
//        })
//        .catch((error) => {
//       // An error happened.
//       navigate('/error');
//     });

//   };

//   useEffect(()=>{
        
//      const unsubscribe =  onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const {uid,email,displayName,photoURL}= user;
//       dispatch(addUser({
//         uid:uid,
//         email:email,
//         displayName:displayName,
//         photoURL:photoURL })); 
//        navigate("/browse") ;
        
//     } else {
//       dispatch(removeUser());
//       navigate('/');
//     }
// });
//   return ()=>unsubscribe();
//    // eslint-disable-next-line react-hooks/exhaustive-deps
// },[]);

// const handlegptsearch=()=>{
//   dispatch(toggleGptSearchView());
// };
// const addLangFunc=(e)=>{
//   dispatch(addlang(e.target.value));
// }
  


  return (
    <div className=' absolute z-10 w-screen from-blue py-2 px-8 flex justify-between  '>

      <img className='w-24' src={logo} alt='logo'/>
         {
            (
            <div className='flex'>
              
           
           
            <button className='mx-2 p-2 text-white font-bold'  >Sign Out</button>
            </div>
           )
          
         }
      </div>
      
  )
}

export default Header;