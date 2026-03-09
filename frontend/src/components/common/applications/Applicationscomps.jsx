import React from 'react'
import { Link } from 'react-router'
import Linkcomps from '../Linkcomps'

export default function Applicationscomps({applicant_id, job_title, resume_url, total_job_views, status}) {
  return (
    <div key={applicant_id} className='bg-neutral-800 text-white rounded-xl shadow-lg flex justify-between items-start flex-col gap-3 border border-neutral-600 p-8 w-82'>
      <h2>Title: {job_title}</h2>
      <Linkcomps to={`https://${resume_url}`} content={'View Resume'}/>
      <h2>total_job_views: {total_job_views}</h2>
      <h2>status: {status}</h2>
    </div>
  )
}
