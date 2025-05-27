import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login'
import Body from './Components/Body'
import { Provider, useDispatch } from 'react-redux'
import appStore from './utils/appStore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/firebase'
import { addUser } from './utils/userSlice'
import { useNavigate } from 'react-router-dom'

function App() {
   
  return (
    
  <Provider store={appStore}>
  <Body/>
  </Provider>
    
  )
}

export default App
