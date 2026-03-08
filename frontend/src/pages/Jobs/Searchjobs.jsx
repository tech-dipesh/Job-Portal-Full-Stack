import React, { useState } from 'react'
import InputComps from '../../components/common/Input'
import { useEffect } from 'react'
import CustomDebounceHook from "../../hooks/useDebounce"
import useFetchData from '../../hooks/useFetchData'
import { searchJobs } from '../../api/auth.job'
import { Link } from 'react-router'
import Textcomps from '../../components/common/Textcomps'
import ButtonComps from '../../components/common/Button'
import Jobcomps from '../../components/common/Jobcomps'
export default function Searchjobs() {
  const [search, setSearch]=useState("")
  const debounce=CustomDebounceHook(search, 300)
const { data, error, loading, execute } = useFetchData(searchJobs);

  useEffect(() => {
    if (debounce) {
      execute(debounce);
    }
  }, [debounce]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Textcomps content='Search a jobs'/>
      <div className='max-w-2xl mx-auto w-full space-x-2'>
      <InputComps placeholder='Your Search Term' type='text' click={setSearch} value={search} className='text-center text-gray-600 mt-2'/>
      <span onClick={()=>setSearch("")}><ButtonComps values='Clear'/></span>
      </div>
      <div>Search Term: {debounce}</div>
      {loading &&  <div>Loading...</div>}
      {error &&  <div className='text-red-500'>{error}</div>}
      {!data && <div>No Result Found</div>}
      <div className='grid container mx-auto space-y-2 grid-cols1 gap-6 p-4'>
        {data && data?.message.map(({uid, title, description, salary, job_type})=>(
          <Jobcomps uid={uid} title={title} description={description} salary={salary} job_type={job_type}/>
        ))}
    </div>
    </div>
  )
}
