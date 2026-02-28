import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export default function EachJob() {
  const [value, setValue]=useState({});
  const [error, setError]=useState(false)
  const {VITE_SERVER_URL: baseUrl}=import.meta.env
  const {jobId}=useParams();
  const fetchData=async()=>{
    try {
      console.log('data')
      const {data}=await axios.get(`${baseUrl}/jobs/${jobId}`)
      setValue(data)
    } catch (error) {
      console.log('error', error)
      if(error.response.status==403){
        setValue({message: "Id Doesn't Exist that you're looking for."});
      }
      setError(true)
    }
  }
  useEffect(() => {
    fetchData();
  }, [jobId])
  
  if(value.message){
    return (<div>{value.message}</div>)
  }
  console.log('value', value)

  console.log('value', value?.skills)
  return (
    <div>
      <p>Job Id: {value.uid}</p>
      <p>Title: {value.uid}</p>
      <p>Description: {value.description}</p>
      <p>Job Type: {value.job_type}</p>
      <p>Salary: {value.salary}</p>
      <p>Total Job View: {value.total_job_views}</p>
      <p>Experience: {value.experience_years}</p>
      <div className='flex gap-8'>
        Skills:
      {value?.skills?.map((skill, i)=>(
          <p key={i} className='border-2 bg-slate-600 p-2 rounded-xl cursor-pointer'>{skill}</p>
      ))}
      </div>

    </div>
  )
}
