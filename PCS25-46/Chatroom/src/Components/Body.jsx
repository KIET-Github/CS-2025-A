import React, { useEffect } from 'react'
import Login from './Login'
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';

const Body = () => {

  return (
    <div>
        <Login/>
      
    </div>
  )
}

export default Body
