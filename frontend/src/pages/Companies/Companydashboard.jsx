import React, { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getCompanyDashboard } from '../../api/auth.companies'
import { Link, useNavigate, useParams } from 'react-router';
import Errorloading from '../../components/common/Errorloading';
import { useAuth } from '../../context/Authcontext';
import ButtonComps from '../../components/common/Button';

export default function Companydashboard() {
  const navigate=useNavigate()
   const {data:authdata, error:errdata, loading:loaddata}=useAuth();
  const { execute, data, error, loading } = useFetchData(getCompanyDashboard);
  useEffect(() => {
    // (async () =>{
    //   await execute()
    // })()
    execute()
  }, [])
  if(error=="You're not a employee of the company"){
    return navigate("/")
  }
  console.log('data', data)
  const {company_id, userVerified, role}=authdata ?? {};
  console.log('role', role)
  const {message}=data || {}
  console.log('message', message)
  return (
    <div>
      <h1>Company Dashboard.</h1>
      {message && 
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-black'>
      <div className='bg-blue-100 p-4 rounded-lg'>Total Jobs: {message?.total_jobs}</div>
      <div className='bg-green-100 p-4 rounded-lg'>Total Applications: {message?.total_applications}</div>
      <div className='bg-yellow-100 p-4 rounded-lg'>Open Jobs: {message?.open_jobs}</div>
      <div className='bg-purple-100 p-4 rounded-lg'>Total Employees: {message?.total_employees}</div>
     </div>
      }
      <Errorloading data={{error:errdata, loading:loaddata}}/>
      <Errorloading data={{error, loading}}/>
       {company_id && 
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
          <Link to={`/companies/${company_id}/jobs`}><ButtonComps values='All Owned Jobs'/></Link>
          <Link to={`/companies/${company_id}/applications`}><ButtonComps values='All Applications'/></Link>
          <Link to={`/companies/${company_id}/users/all`}><ButtonComps values='All Employees'/></Link>
          </div>
        }
        {role=='admin' && 
        <>
        <Link to='/companies/all'><ButtonComps values='All Companies'/></Link>
        <Link to='/companies/new'><ButtonComps values='New Company'/></Link>
        </>
        }
    </div>
  )
}
