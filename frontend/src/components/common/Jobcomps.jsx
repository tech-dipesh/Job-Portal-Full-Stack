import React from 'react'
import { Link } from 'react-router'
import Linkcomps from './Linkcomps'
import Textcomps from './Textcomps'

export default function Jobcomps({uid, title, description, salary, job_type, total_job_views, skills, is_job_open, status,experience_years, company_name, applied_at}) {
  return (
     <div key={uid} className='bg-neutral-500  rounded-xl shadow-lg transition-shadow flex  justify-between items-start flex-col gap-3 border border-gray-200 p-8 min-h-auto w-full'>
          <Linkcomps content={'See Job'} to={`/jobs/${uid}`} className='md:text-2xl sm:text-2xl'/>
          <div className='flex items-center gap-2'>
          <Textcomps content={`Title: ${title}`} style='text-2xl'/>
          {is_job_open !== undefined && (
            <span className={`text-xs px-2 py-1 rounded-full ${is_job_open ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
              {is_job_open ? ' Open' : '○ Closed'}
            </span>
          )}
        </div>
          <h2 className='line-clamp-2'>Description: {description}</h2>
          <div className='flex gap-2 mt-2'>
          <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm'>{job_type}</span>
          {salary && <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>₹{salary}</span>}
         </div>
         {status && (
          <div className='mt-3 pt-3 border-t border-gray-300'>
            <span className={`text-sm px-3 py-1 rounded-full ${
              status === 'accepted' ? 'bg-green-200' : 
              status === 'rejected' ? 'bg-red-200' : 'bg-yellow-200'
            }`}>
              Status: {status}
            </span>
          </div>
        )}
          {experience_years && <h2>Experience Years: {experience_years} years</h2>}
          {company_name && <h2>Company Name: {company_name}</h2>}
          {skills?.length > 0 && (
          <div className='flex flex-wrap gap-1 mt-2'>
            {skills.slice(0,3).map((s, i) => (
              <span key={i} className='bg-purple-100 text-purple-800 p-1 rounded text-xs'>{s}</span>
            ))}
            {skills.length > 3 && <span className='text-xs text-gray-500'>+{skills.length-3}</span>}
          </div>
        )}
      
      {applied_at && <p className='text-sm text-neutral-800'>Applied on: {new Date(applied_at).toLocaleDateString()}</p>}
    </div>
  )
}
