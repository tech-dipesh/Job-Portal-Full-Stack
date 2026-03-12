import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { bookMarkJob, deleteExistingJobs, individualJobs, removeBookmark } from '../../api/auth.job';
import useFetchData from '../../hooks/useFetchData';
import ButtonComps from "../../components/common/Button"
import isOwnerMiddleware from '../../../../backend/Middleware/isOwner';
import Applyjob from '../Applications/Applyjob';
import Loading from '../../components/Loading';
import Errorloading from '../../components/common/Errorloading';
import { useAuth } from '../../context/Authcontext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solid } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as regular } from '@fortawesome/free-regular-svg-icons'
export default function EachJob() {
  const navigate = useNavigate()
  const [success, setSuccess] = useState()
  const [error, setError]=useState()
  const { id } = useParams();

  const {data}=useAuth()

  const { data:fetchdata, error:fetchErr, loading, execute } = useFetchData(individualJobs)
  const { error: errabookmark, loading: loadabookmark, execute: bookmark } = useFetchData(bookMarkJob)
  const { error: removeerrbookmark, loading: loadremovebookmark, execute: removeBook } = useFetchData(removeBookmark)
  const { error: errdelete, loading: loaddelete, execute: deletes } = useFetchData(deleteExistingJobs)
  console.log('fetchdata', fetchdata)
  useEffect(() => {
    execute(id)
  }, [id])
  const saveJob = async () => {
    await bookmark(id).then(t => setSuccess(t?.message))
    navigate(0)
  }
  const RemoveSavedJobs = async () => {
    const output=await removeBook(id);
    setSuccess(output?.message)
    navigate(0)
  }
  if (loading || loadabookmark || loadremovebookmark) {
    return <Loading/>
  }
  if (error || errabookmark || removeerrbookmark) {
    return <Errorloading data={{error: error || errabookmark}}/>
  }
  const {role}=data ?? {}
  const deleteJob=async ()=>{
    const con=confirm("Are you really want to delete a job.");
    if(!con) return;
    const res=await deletes(id)
    if(!res){
      setError(errdelete);
      return;
    }
    setTimeout(() => {
        navigate('..')
    }, 250);
    
  }
  const ShowEditButton = () => {
      const sendAllValue={uid: fetchdata.uid, title: fetchdata.title, description: fetchdata.description, job_type: fetchdata.job_type, salary: fetchdata.salary, skills: fetchdata.skills}
      console.log('value is', )
      return  (
        <>
        <div onClick={deleteJob}>
          <ButtonComps values="Delete Job" color='bg-red-500  '/>
        </div>
        <Link to={`edit`} state={sendAllValue}>
          <ButtonComps values="Edit Job" />
        </Link>
        {/* <Link to={`../../applications/${fetchdata.uid}/applylist`} state={sendAllValue}> <ButtonComps values="All Jobs Applicant" /> </Link> */}
        <Link to={`/companies/${fetchdata.company_id}/applications`} state={sendAllValue}> <ButtonComps values="All Jobs Applicant" /> </Link>
        </>
      );
    // }
  }
 if(loading || loaddelete ||loadabookmark){
  return <Loading/>
 }
    const {job_data}=fetchdata ?? {}
    const valueButton = job_data?.is_save  ? <FontAwesomeIcon icon={solid}/> : <FontAwesomeIcon icon={regular}/>;
    const clickFun = job_data?.is_save ? RemoveSavedJobs : saveJob
    return (
      <article>
        <Errorloading data={{error: fetchErr}}/>
        {fetchdata && 
        <div  className='bg-neutral-900 p-8 h-auto max-w-xl w-full mx-auto rounded-lg flex justify-center flex-col mt-10 space-y-3'>
          <p>Job Id: {fetchdata.uid}</p>
          <p className='text-xl font-semibold'>Title: {fetchdata.title}</p>
          <p>Description: {fetchdata.description}</p>
          <p>Job Type: {fetchdata.job_type}</p>
          <p>Salary: {fetchdata.salary}</p>
          <p>Total Job View: {fetchdata.total_job_views}</p>
          <p>Experience: {fetchdata.experience_years}</p>
          <div className='flex flex-wrap gap-2'>
            <span>Skills</span>
            {fetchdata?.skills?.map((skill, i) => <span key={i} className='border-2 bg-slate-600 p-2 rounded-xl cursor-pointer flex flex-col gap-2'>{skill}</span>)}
          </div>
        {(!fetchdata.is_owner && role=='guest') &&  <span onClick={clickFun} className='flex gap-3 mt-4'><ButtonComps values={valueButton} /></span>  }
        {/* {showEditButton()} */}
        {fetchdata && fetchdata?.is_owner && <ShowEditButton/>}
        </div>
        }
        <div className='flex justify-end w-full'>
      {role=='guest' && <Applyjob value={fetchdata?.is_applied}/>}
  </div>
      </article>
    )
  }