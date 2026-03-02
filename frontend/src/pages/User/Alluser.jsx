import React, { useEffect, useState } from 'react'
import { getAllUser } from '../../api/auth.user';

export default function Alluser() {
  const [user, setUsers]=useState([]);
  const [error, setError]=useState()
  const getValueAll=async()=>{
    try {
      const {data}=await getAllUser();
      setUsers(data)
    } catch (error) {
      console.log('error', error.response)
      if(!error.response){
        return setError("Network Error")
      }
      const {status, data}=error.response;
      if(status==403){
        return setError("Only Admin Alllowed You're not a owner.")
      }
      else if(status==401){
        return setError("PLeased Logged in First.")
      }
      setError(data?.message)
    }
  }
  useEffect(()=>{
    getValueAll()
  }, [])

  
  if(error){
    return <div className='text-red-500'>{error}</div>
  }
  return user.length==0 ?<div>Loading</div>:(
    <div>
      <h1>All User List:</h1>
      {user && user?.map(({userid, firstname, lastname, education, email, role, resume_url, profile_pic_url, skills, experience_years})=>(
           <div key={userid} className='container grid grid-cols-4 gap-16 '>
            <h1>Name: {firstname} {lastname}</h1>
            <h2>Education: {education}</h2>
            <h2>Email: {email}</h2>
            <h2>Role: {role}</h2>
            <h2>ResumeUrl: {resume_url}</h2>
            <h2>Profile Pic Url:</h2>
            <img src={profile_pic_url} alt={firstname} />
            <h4>Skills:</h4>
            {skills && skills.map(skill=><h5>{skill}</h5>)}
            <p>Experience Years: {experience_years}</p>
          </div>
        ))
      }
      {error && <div className='text-red-500'>{error}</div>}
    </div>
  )
}
