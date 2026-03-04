import React from 'react'
import { Link, useNavigate } from 'react-router'
import useFetchData from '../hooks/useFetchData'
import { logoutUser } from '../api/auth.user'
import { useAuth } from '../context/Authcontext'
import ButtonComps from './Button'

export default function Header() {
  const navigate=useNavigate()
  const {execute}=useFetchData(logoutUser);
 const LogoutPage=async()=>{
  await execute()
  navigate(0)
 }
 const {data}=useAuth();
 const {userVerified, company_id, uid}=data ?? {};
  return (
       <header className='flex justify-between items-center p-6 text-lg border-b mb-20'>
        <Link to='/'>Homepage</Link>
        <div className='flex gap-6'>
          <Link to='/jobs'>Jobs</Link>
          <Link to='/jobs/bookmarks'>Bookmarks</Link>
          {(userVerified &&  company_id ) &&
            <Link to='users/all'>Dashboard</Link>
          }
          <Link to={`/users/${uid}/profile`}>Your Profile</Link>
          {!data && <Link to='/auth/login'>Login</Link>}
          {data && <Link to='/' onClick={LogoutPage}><ButtonComps values='Logout' color='bg-red-500'/></Link>}
        </div>
      </header>
  )
}
