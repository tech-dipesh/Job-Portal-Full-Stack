import React from 'react'
import { Link } from 'react-router'
import Linkcomps from './Linkcomps'
import Textcomps from './Textcomps'

export default function Jobcomps({uid, title, description, salary, job_type, total_job_views, skills, is_job_open, experience_years, company_name}) {
  return (
     <div key={uid} className='bg-neutral-500  rounded-xl shadow-lg transition-shadow flex flex-col gap-3 border border-gray-200 p-8 min-h-auto w-82 '>
          <Linkcomps content={'See Job'} to={`./${uid}`}/>
          <Textcomps content={`Title: ${title}`} size='text-2xl'/>
          <h2 className='line-clamp-2'>Description: {description}</h2>
          <div className='flex gap-2 mt-2'>
          <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm'>{job_type}</span>
          <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>₹{salary}</span>
         </div>
          {total_job_views && <h2>Total Job Views: {total_job_views}</h2>}
          {experience_years && <h2>Experience Years: {experience_years}</h2>}
          {company_name && <h2>Company Name: {company_name}</h2>}
    </div>
  )
}
