import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useFetchData from '../hooks/useFetchData'
import { logoutUser } from '../api/auth.user'
import { useAuth } from '../context/Authcontext'
import {faArrowRotateRight, faBars, faBriefcase, faMagnifyingGlass, faUser} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import reactIcons from "../assets/react.svg"
import Linkcomps from './common/Linkcomps'
export default function Header() {
  const navigate = useNavigate()
  const { execute } = useFetchData(logoutUser);
  const [profile, setProfile] = useState(false)
  const [isMobileMenu, setIsMobileMenu]=useState(false)
  const LogoutPage = async () => {
    await execute()
    navigate(0)
  }

  const { data, reexecute } = useAuth();
  const { userVerified, uid, company_id } = data ?? {};

  const userProfile=<>{
    uid && <div className='relative'>
              <FontAwesomeIcon icon={faUser}  onClick={() => setProfile(!profile)} size='2x' className='bg-slate-900 h-32 w-32 rounded-full cursor-pointer flex justify-center items-center'/>
            {profile &&
              <div className='absolute top-12 right-0 bg-gray-500 shadow-lg rounded-lg p-4 w-32 border z-50 justify-center'>
                <Linkcomps to={`/users/${uid}/profile`} content='Your Profile'/>
                <FontAwesomeIcon icon={faArrowRotateRight}  onClick={()=>reexecute()} className='cursor-pointer justify-center'/>
                <div className='block'>You're: {company_id ? <FontAwesomeIcon icon={faBriefcase} />: <FontAwesomeIcon icon={faMagnifyingGlass} /> }</div>
                <Link to='/' onClick={LogoutPage} className='block py-2 text-red-600'>
                  Logout
                </Link>
              </div>
            }
            </div>
    }
          {!uid &&
            <>
              <Linkcomps to='/auth/login' content={'Login'}/>
              <Linkcomps to='/auth/signup' content={'Signup'}/>
            </>
}
    </>

  const allNavLinks= <div className=' hidden md:flex lg:flex gap-7 ml-auto items-center'>
          {userVerified &&
            <>
              <Linkcomps to={'/jobs'} content='Jobs'/>
              <Linkcomps to={'/jobs/bookmarks'} content='Bookmarks'/>
            </>
          }
          {userProfile}
        </div>

    const allCompanyLinks= company_id && 
          <div className='hidden md:flex lg:flex gap-7 ml-auto items-center'>
              <Linkcomps to='companies/dashboard' content={'Dashboard'}/>
              <Linkcomps to='jobs/new' content={'Create New Job'}/>
              {userProfile}
        </div>
        
  return (
      <div className='mt-2 sticky top-0 z-50 md:w-screen sm:w-screen w-full flex justify-end items-center px-4 py-4 bg-neutral-700'>
        <header className='flex w-full font-semibold items-center justify-between'>
          <Link to={'/'}><img src={reactIcons} alt="Profile"/></Link>
          <div className='flex md:hidden items-center justify-center'>
           <div className='flex md:hidden items-center'>
            <FontAwesomeIcon icon={faBars} className='cursor-pointer text-white text-xl' onClick={()=>setIsMobileMenu(!isMobileMenu)}/>
           </div>
           {isMobileMenu &&
            <div>
                {company_id ? allCompanyLinks :allNavLinks}
            </div>
           }
        </div>
        {company_id ? allCompanyLinks:allNavLinks}
        </header>
      </div>
    )
}
