import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";
import { Link, Outlet, useNavigate } from 'react-router';
import isUserLoggedIn from './api/isUserLoggedin';
import {logoutUser} from "./api/Login"

function App() {
  const navigate=useNavigate()
  const [isLoggedUser, setUserLogged] = useState({ login: false, verify: false });
  const checkUserLogged = async () => {
    try {
      const { status, data } = await isUserLoggedIn();
      console.log('status', status, data)
      setUserLogged({ login: true, verify: true })
    } catch (error) {
      if (!error.response){
        setUserLogged({verify: false, login: false})
      }
      console.log('value', error.response)
       const { status, data } = error.response
      if (status == 401 && data?.message == "Please Verify Your Send to your mail.") {
        setUserLogged({verify: false, login: true})
      }
      else{
        setUserLogged({verify: false, login: false})
      }
    }
  }
  useEffect(() => {
    checkUserLogged()
  }, [])
  
  useEffect(() => {
    if (isLoggedUser.login === true && isLoggedUser.verify === false) {
    const timer= setTimeout(() => {
    navigate("/verify-email")
  }, 2000)
  return ()=>{
    clearTimeout(timer)
  }
}
  }, [isLoggedUser])


 const LogoutPage=async()=>{
  try {
    const {data}=await logoutUser()
    navigate("/")
  } catch (error) {
    console.log(error)
    console.log(error.reponse)
  }
 }
  


  console.log('is', isLoggedUser)
  return (
    <div className="min-h-screen flex flex-col">
      <header className='flex justify-between items-center p-6 text-lg border-b mb-80'>
        <Link to='/'>Homepage</Link>
        <div className='flex gap-6'>
          <Link to='/jobs'>Jobs</Link>
          {isLoggedUser.login == true && isLoggedUser.verify == true ? <>
            <Link to='user//dashboard'>Dashboard</Link> 
          </>
          : isLoggedUser.login == true ? <Link to='/verify-email'>Verify</Link> : <>
            <Link to='/signup'>Signup</Link>
            <Link to='/login'>Login</Link>
          </>}
          {isLoggedUser.login==true && <Link to='/home' onClick={LogoutPage}>Logout</Link> }
        </div>
      </header>
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default App
