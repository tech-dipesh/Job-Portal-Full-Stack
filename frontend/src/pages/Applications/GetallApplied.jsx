import React, { useEffect, useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getAllAppliedJobs } from '../../api/auth.applications'
import Jobcomps from '../../components/Jobcomps'

export default function GetallApplied() {
  const {data, error, loading, execute}=useFetchData(getAllAppliedJobs)
  useEffect(()=>{
    execute()
  }, [])
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div className='text-red-500'>{error}</div>}
      <h1>Get All Applied Jobs:</h1>
      {data && data?.message.map(({title, description, uid, experience_years, job_type})=>(
       <Jobcomps title={title} description={description} uid={uid} experience_years={experience_years} job_type={job_type}/>
      ))}
    </div>
  )
}
