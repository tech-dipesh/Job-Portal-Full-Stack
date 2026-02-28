import axios from 'axios';
import React from 'react'
import { Link, Links } from 'react-router';

const {VITE_SERVER_URL}=import.meta.env
const { data } = await axios.get(`${VITE_SERVER_URL}/jobs`);

export default function Jobs() {
  console.log('here on this page')

  // {console.log(skills)}
  const { message } = data;
  
  return (
    <>
    <div className='container grid grid-four--cols'>
      {message.map(({ uid, title, description, salary, job_type, total_job_views, skills, is_job_open, experience_years, company_name }) => (
        <div key={uid} className='bg-taupe-600 rounded-xl'>
          <Link to={`./${uid}`}>{uid}</Link>
          <h2 className=''>Title: {title}</h2>
          <h2>Dexcription: {description}</h2>
          <h2>Salary: {salary}</h2>
          <h2>Job type: {job_type}</h2>
          <h2>Total Job Views: {total_job_views}</h2>
          <div>Skills:
            {skills?.map((skill, i) =>
              <p key={i}>{skill}</p>
            )}
          </div>
          <h2>Is job Open: {is_job_open}</h2>
          <h2>Experience Years: {experience_years}</h2>
          <h2>Company Name: {company_name}</h2>
        </div>
      ))}
    </div>
      </>
  )
}
