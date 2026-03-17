import { useState } from 'react'
import { Link } from 'react-router'

import Buttoncomps from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

export default function EachJobAction({ setAction, data, }) {
  const [loaddesc, setShowDesc] = useState(false)
  const { description, salary, skills, company_id, is_applied, is_owner, total_job_views } = data || {}
  return (
    <>
      <p className='text-xl wrap-break-word text-slate-300 leading-relaxed block min-h-30'>
        <p className='text-xs tracking-widest text-slate-500 my-1'>Description:</p>
        {description?.length < 100 ?
          <p className='text-slate-500 leading-relaxed'>{description}</p> :
          <>
            {!loaddesc && description?.slice(0, 100)}
            {!loaddesc && <span onClick={() => setShowDesc(!loaddesc)}><Buttoncomps values='Load More' /></span>}
            {loaddesc && description}
            {loaddesc && <span onClick={() => setShowDesc(!loaddesc)}><Buttoncomps values='Show Less' /></span>}
          </>
        }
      </p>
      <div className='flex flex-col gap-2'>
        <span className='tracking-widest text-xs text-slate-500 my-2'>Skills</span>
        <div className='flex flex-wrap gap-2'>
          {skills?.map((skill, i) => <span key={i} className=' px-3 py-1 bg-slate-700 rounded-full justify-center flex align-middle  text-sm'>{skill}</span>)}
        </div>
      </div>
      <div className='grid min-h-24 lg:flex lg:flex-wrap items-center justify-between  bg-slate-700 rounded-lg lg:min-h-16'>
        {is_owner ?
          <div className='flex items-center justify-between w-full'>
            <Link to={`/companies/${company_id}/applications`} className='flex-1'>
              <Buttoncomps values='Applicants' color='bg-slate-600' />
            </Link>
            <Link to='edit' state={data} className='flex-1'>
              <Buttoncomps values='Edit' />
            </Link>
            <span onClick={() => setAction("delete")} className='flex-1'>
              <Buttoncomps values='Delete' color='bg-red-600' />
            </span>
            <p className='text-sm text-slate-400 ml-auto'>Total Job View: {total_job_views}</p>
          </div> :
          <div className='flex flex-wrap  items-center justify-between w-full px-4'>
            <div className='justify-center flex flex-col'>
              <p className='text-xs text-slate-400'>Annual salary</p>
              <p className='text-lg font-semibold'>{salary ?
                <><FontAwesomeIcon icon={faDollarSign} />{salary} </> : 'none'}
              </p>
            </div>
            <span onClick={() => is_applied ? setAction("withdraw") : setAction("apply")} className='lg:my-10 text-nowrap text-2xl my-6 justify-end'>
              <Buttoncomps values={is_applied ? 'Withdraw Apply' : "Apply Job"} color={is_applied ? 'bg-yellow-500' : 'bg-green-500'} />
            </span>
          </div>
        }
      </div>
    </>
  )
}