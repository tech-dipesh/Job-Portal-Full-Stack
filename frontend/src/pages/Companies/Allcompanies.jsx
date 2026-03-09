import React from 'react'
import { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getAllCompanies } from '../../api/auth.companies'
import { Link } from 'react-router'
import Companyjobcomps from '../../components/common/company/Companycomps'
import Companycomps from '../../components/common/company/Companycomps'
import ButtonComps from '../../components/common/Button'

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
      <div className='container grid grid-cols-2 gap-16 p-8'>
      {data && data.map(({uid, name, description, website, created_at, founded_year, location})=>(
        <Companycomps uid={uid} website={website} name={name} description={description} created_at={created_at} founded_year={founded_year} location={location}/>
      ))}
      </div>
    </div>
  )
}
