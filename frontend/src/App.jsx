import { useEffect, useState } from 'react'
import './App.css'
import { Link, Outlet, useNavigate } from 'react-router';
import {isUserLoggedIn, logoutUser} from './api/auth.user';
import Header from './components/Header';
import { useAuth } from './context/Authcontext';
import Footer from './components/Footer';

function App() {
 const {data, error, loading}=useAuth();

 if(loading){
  return <div>Loading...</div>
 }
  return (
    <div className="min-h-screen flex flex-col">
      <Header data={data}/>
      {error && <div>{error}</div>}
        <Outlet />
      <Footer data={data}/>
    </div>
  )
}

export default App
