import React, { useEffect, useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getAllAppliedJobs, getAllJobsApplicant } from '../../api/auth.applications'
import { Link, useParams } from 'react-router'
import Loading from '../../components/Loading'
import Employeecomps from '../../components/common/employees/Employecomps'

export default function Jobapplicant() {
  const [result, setResult]=useState([])
  const {id}=useParams()
  const {data, error, loading, execute}=useFetchData(getAllJobsApplicant)
  useEffect(()=>{
    execute(id)
  }, [result])
   if(loading){
    return <Loading/>
   }
  return (
    <div>
      {error && <div className='text-red-500'>{error}</div>}
      <h1>Who've applied so far on the role:</h1>
      <div className='container grid grid-cols-2 gap-16 p-8'>
      {data && data.message.map(({applied_at, experience, full_name, resume_url, skills, education}, i)=>(
        <Employeecomps education={education} key={i} full_name={full_name} applied_at={applied_at} experience={experience} skills={skills}/>
      ))}
    </div>
    </div>
  )
}
