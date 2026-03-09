import React from 'react'
import useFetchData from '../../hooks/useFetchData';
import { getCompanyApplications, getCompanyJobs } from '../../api/auth.companies';
import Errorloading from '../../components/common/Errorloading';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import Applicationscomps from '../../components/common/applications/applicationscomps';

export default function Allapplications() {
  const {id}=useParams()
  const {data, error, loading, execute}=useFetchData(getCompanyApplications);
  useEffect(()=>{(async()=>execute(id))()}, [id])
  const {message}=data || {}
  return (
    <div className='bg-neutral-700 min-h-screen p-8'>
      <Errorloading data={{error, loading}}/>
    <div className='flex gap-6 mb-6 text-white'>
      <span>Total: {message?.length}</span>
      <span>Pending: {message?.filter(a => a.status === 'pending').length}</span>
      <span>Approved: {message?.filter(a => a.status === 'approved').length}</span>
      </div>
      <h1 className='text-white text-2xl font-bold mb-6'>All Applications</h1>
      <div className='grid grid-cols-3 gap-6'>
      {message && message.map(({job_title, resume_url, status, total_job_views, applicant_id})=>(
           <Applicationscomps job_title={job_title} resume_url={resume_url} total_job_views={total_job_views} status={status} applicant_id={applicant_id}/>
      ))}
    </div>
    </div>
  )
}
