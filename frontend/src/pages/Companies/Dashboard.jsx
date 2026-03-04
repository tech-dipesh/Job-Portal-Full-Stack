import React, { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { getCompanyDashboard } from '../../api/auth.companies'
import { useParams } from 'react-router';

export default function Dashboard() {
  const { id } = useParams();
  const { execute, data, error, loading } = useFetchData(getCompanyDashboard);
  console.log('id', id)
  useEffect(() => {
    (async () => await execute(id))()
  }, [id])
  console.log('dashboard', data && data[0])
  console.log('error', error)
  console.log(typeof data.message)
  return (
    <div>
      <h1>Company Dashboard.</h1>
      {loading && <div>Loading...</div>}
      {error && <div className='text-red-500'>{error}</div>}
      {!id && !data && data[0]?.map(({ description, is_job_open, job_type, total_job_views, totalcount, title, status, uid }) => (
        <div key={uid}>
          <h1>Title: {title} </h1>
          <h1>  Description: {description} </h1>
          <h1>  Description: {description} </h1>
          <h1>  is_job_open: {is_job_open} </h1>
          <h1>  job_type: {job_type} </h1>
          <h1>  total_job_views: {total_job_views} </h1>
          <h1>  totalcount: {totalcount} </h1>
          <h1>  status: {status} </h1>
        </div>
      ))}
    </div>
  )
}
