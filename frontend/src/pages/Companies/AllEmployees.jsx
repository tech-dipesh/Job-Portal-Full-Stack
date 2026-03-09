import React, { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getCompanyEmployee } from '../../api/auth.companies'
import { useParams } from 'react-router';
import Employecomps from '../../components/common/employees/employecomps';

export default function AllEmployees() {
  const {data, error, loading, execute}=useFetchData(getCompanyEmployee);
  const {id}=useParams()
  useEffect(()=>{
    execute(id)
  }, [])
  console.log('data is', data)
  return (
    <div>
      <h2>All The Employees:</h2>
      {data?.message && data?.message.map(({full_name, email, experience, education, role, resume_url, profile_pic_url})=>(
        <Employecomps full_name={full_name} email={email} experience={experience} education={education} role={role} resume_url={resume_url} profile_pic_url={profile_pic_url}/>
      ))}
    </div>
  )
}
