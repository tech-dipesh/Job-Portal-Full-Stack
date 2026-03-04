import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import useFetchData from '../hooks/useFetchData'
import { logoutUser } from '../api/auth.user'
import { useAuth } from '../context/Authcontext'
import ButtonComps from './Button'

export default function Footer({data}) {
  const navigate=useNavigate()
  const {execute}=useFetchData(logoutUser);
 const LogoutPage=async()=>{
  await execute()
  navigate(0)
 }
 
 const {userVerified, company_id, uid}=data ?? {};
  return (
       <footer className='flex justify-between items-center p-6 text-lg border-b mb-20'>
          {company_id && 
          <>
          <Link to='companies/all'><ButtonComps values='All Companies'/></Link>
          <Link to='companies/new'><ButtonComps values='New Company'/></Link>
          <Link to={`companies/${uid}/dashboard`}><ButtonComps values='Dashboard'/></Link>
          </>
          }
          <h5> All rights reserved to Dipesh. </h5>
      </footer>
  )
}
