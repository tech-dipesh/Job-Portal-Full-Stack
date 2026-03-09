import React from 'react'
import useFetchData from '../../hooks/useFetchData';
import { getCompanyJobs } from '../../api/auth.companies';
import Errorloading from '../../components/common/Errorloading';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import Companycomps from '../../components/common/company/Companycomps';
import Jobcomps from '../../components/common/Jobcomps';

export default function AllCompanyJobs() {
  const {id}=useParams()
  const {data, error, loading, execute}=useFetchData(getCompanyJobs);
  // useEffect(()=>execute(id), [id])
  useEffect(()=>{
    ;(async()=>await execute(id))()
  },[id])
  const {message}=data || {};
  console.log('message', message)
  return (
    <div>
      <Errorloading data={{error, loading}}/>
      <h1>All Company Jobs</h1>
      <div className='grid container grid-cols-3'>
      {message && message.map(({uid, title, description, salary, job_type, experience_years, total_job_views, founded_year, location})=>(
        // <Jobcomps uid, title, description, salary, job_type, total_job_views, skills, is_job_open, status,experience_years, company_name, applied_at
        <Jobcomps uid={uid} title={title} description={description} salary={salary} job_type={job_type} experience_years={experience_years} total_job_views={total_job_views} />
      ))}
      </div>
    </div>
  )
}
