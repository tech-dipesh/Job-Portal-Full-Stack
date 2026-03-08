import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import { useAuth } from '../context/Authcontext';
import Errorloading from '../components/Errorloading';
import ButtonComps from '../components/Button';
import Linkcomps from '../components/Linkcomps';

export default function Home() {
  const {data, error, loading}=useAuth();
  const [isVerify, setIsVerify]=useState(false)
  const [isLogin, setIsLogin]=useState(false)
  const {state}=useLocation()
useEffect(() => {
  (() => {
    if (error === 'Please Verify Your verification code.') {
      setIsVerify(true);
      setIsLogin(false);
    } else if (error === 'No token Please Loged in First') {
      setIsLogin(true);
      setIsVerify(false);
    } else if (data && data.uid) {
      setIsVerify(false);
      setIsLogin(false);
    }
  })();
}, [data, error]);

  return (
    <div className=''>
      <Errorloading data={{loading}}/>
      {isVerify && <Linkcomps to='/auth/verify-email' content={<ButtonComps values='Your Email is not verified Please Verify.'/>}/>}
      {isLogin && <Linkcomps to='/auth/login' content={<ButtonComps values='Please Login First.'/>}/>}
      <h2 className='font-semibold gap-8 margin-6 text-2xl transition-all justify-center'>Welceom to Our Jobify Page.</h2>
      <h3 className='text-3xl'>Full Stack Project where the end to end with from data validation to the Authorize, Authentication To data persistant lot more.</h3>
    <br />
    <div className='text-xl'>
      <h2>Want to show a All jobs On our Platform.
    <br />
      <Linkcomps to={'/jobs/all'} content={'All Jobs'}/>
      </h2>
    </div>
    {state && <Errorloading data={{error: state}}/>}
    </div>
  )
}