import React from 'react'
import { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getAllCompanies } from '../../api/auth.companies'
import { Link } from 'react-router'

export default function Allcompanies() {
  const {data, error, loading, execute}=useFetchData(getAllCompanies)
  useEffect(()=>{
    execute()
  }, [])

  return (
    <div>
      <h1>All Companies List:</h1>
      {loading && <div>loading...</div>}
      {error && <div className='bg-red-500'>{error}</div>}
      {data && data.map(({uid, name, description, website, created_at})=>(
        <div key={uid} className='text-xl grid bg-slate-800 gap-8 padding-28 rounded-xl '>
            <Link to={`../${uid}`} className='text-blue-500 underline'>Visit Page</Link>
            <h1>Name: {name}</h1>
            <h1>Description: {description}</h1>
            <h1>Website: {website}</h1>
            <h1>CreatedAt: {created_at}</h1>
        </div>
      ))}
    </div>
  )
}
