import React from 'react'
import Toast from '../components/Toast'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Buttoncomps from '../components/common/Button';
import Linkcomps from '../components/common/Linkcomps';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Error404() {
  // const val=
  const {state, pathname}=useLocation();
  return (
    <div className='w-full flex flex-col overflow-x-hidden min-h-screen '>
      <Header/>
      <main className='min-h-screen grid  justify-items-center mx-auto'>

      {/* <main className='grid justify-center align-middle text-center'> */}
      <h2>The Page You're looking for doesn't exist, Moved Or Deleted.</h2>
      <FontAwesomeIcon icon={faTriangleExclamation} color='red' size='3-x'/>
      <p >The Page: <span className='text-red-500'>{pathname}</span> Not Found You're Looking for.</p>
      <Buttoncomps values={<Linkcomps to={'/'} content={'Go To Homepage'}/>}/>
      <Footer/>
      </main>
    </div>
  )
}
