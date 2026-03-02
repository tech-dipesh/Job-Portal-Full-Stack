import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { savedJobsList } from '../../api/auth.job'
import useFetchData from '../../hooks/useFetchData'

export default function AllBookmarks() {
  const [value, setValue]=useState()
  const {error, loading, execute } = useFetchData(savedJobsList)
  useEffect(()=>{
      ;(async()=>{
          await execute().then(t=>setValue(t?.message))
      })()
    },[])
    console.log(value)
    if(loading){
      return <div>loading...</div>
    }
  return (
    <div>
      <h1>All Bookmarks</h1>
      <div className='container grid grid-cols-4 margin-8'>
      {value?.map(({uid, title, description, job_type, is_job_open, salary})=>(
        <div className='padding-8 bg-gray-400 gap-8 margin-8 grid' key={uid}>
            <h1>Title: {title}</h1>
            <h1>Description: {description}</h1>
            <h1>Job Type: {job_type}</h1>
            <h1>Is Job Open: {is_job_open}</h1>
            <h1>Salary: {salary}</h1>
        </div>
      ))}
    </div>
    </div>
  )
}
