import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import { useAuth } from '../context/Authcontext';
import Errorloading from '../components/common/Errorloading';
import ButtonComps from '../components/common/Button';
import Linkcomps from '../components/common/Linkcomps';
import Hero from '../components/Hero';

export default function Home() {
  const {data, error, loading}=useAuth();
  const {state}=useLocation();
  const [isVerify, setIsVerify]=useState(false)
  const [isLogin, setIsLogin]=useState(false)
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
      <Hero isVerify={isVerify} isLogin={isLogin}/>
    {state && <Errorloading data={{error: state}}/>}
    </div>
  )
}