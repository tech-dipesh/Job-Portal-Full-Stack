import React, { useRef, useState } from 'react'
import InputComps from '../../components/Input'
import { useEffect } from 'react'
import CustomDebounceHook from "../../hooks/useDebounce"
import useFetchData from '../../hooks/useFetchData'
import { searchJobs } from '../../api/auth.job'
import { Link } from 'react-router'
export default function Searchjobs() {
  const [search, setSearch]=useState("")
  const debounce=CustomDebounceHook(search, 75)
const { data, error, loading, execute } = useFetchData(searchJobs);

  useEffect(() => {
    if (debounce) {
      execute(debounce);
    }
  }, [debounce]);

  console.log('data', data)
  return (
    <div>
      <h2>Search a jobs</h2>
      <InputComps placeholder='Your Search Term' type='text' click={setSearch} value={search}/>
      <div>Search: {debounce}</div>
      {loading &&  <div>Loading...</div>}
      {error &&  <div className='text-red-500'>{error}</div>}
      {!data && <div>No Result Found</div>}
        {!loading && data && data?.map(({uid, title, description, salary, job_type})=>(
            <div className='grid'>
                <Link to={`../${uid}`} className='text-blue-500 underline'>Click Here to Know more</Link>
                <h1>Title: {title}</h1>
                <h2>Description: {description}</h2>
                <h3>Salary: {salary}</h3>
                <h4>Job Type: {job_type}</h4>
            </div>
        ))}
    </div>
  )
}
