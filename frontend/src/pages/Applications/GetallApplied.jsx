import React, { useEffect, useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getAllAppliedJobs } from '../../api/auth.applications'
import Jobcomps from '../../components/common/Jobcomps'

export default function GetallApplied() {
  const {data, error, loading, execute}=useFetchData(getAllAppliedJobs)
  useEffect(()=>{
    execute()
  }, [])
  const [application, setApplication]=useState("")
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div className='text-red-500'>{error}</div>}
      <h1>Get All Applied Jobs:</h1>
      <select className='mb-4 p-2 border rounded cursor-pointer' onChange={{}}>
      <option >All Applications</option>
      <option>Pending</option>
      <option>Interview</option>
      <option>Rejected</option>
      </select>
      {data?.message?.length === 0 && (
        <div className='text-center py-12 text-gray-500'>
        <p>You haven't applied to any jobs yet.</p>
        <Link to='/jobs' className='text-blue-500 underline mt-2 block'>Browse Jobs</Link>
      </div>
       )}
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
      {data && data?.message.map(({title, description, uid, experience_years, job_type, status, applied_at})=>(
       <Jobcomps title={title} description={description} uid={uid} experience_years={experience_years} job_type={job_type} status={status} applied_at={applied_at}/>
      ))}
      </div>
    </div>
  )
}
