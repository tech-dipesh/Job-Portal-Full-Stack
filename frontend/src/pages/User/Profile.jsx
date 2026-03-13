import React, { useEffect, useState } from 'react'
import { getIndividualUser, postUserSkills, uploadProfilePicture } from '../../api/auth.user';
import { Link, useNavigate, useParams } from 'react-router';
import authUid from "../../auth/authUid"
import Inputcomps from "../../components/common/Input"
import ButtonComps from '../../components/common/Button';
import validateText from "../../auth/textValidate"
import useFetchData from '../../hooks/useFetchData';
import Textcomps from '../../components/common/Textcomps';
import defaultImage from "../../assets/default-image.webp"
import Linkcomps from "../../components/common/Linkcomps"
import Loading from '../../components/Loading';
import Errorloading from "../../components/common/Errorloading"
import Popup from '../../components/Popup';
import PostSkills from '../../components/common/User/PostSkills';
import Buttoncomps from '../../components/common/Button';
import {useAuth} from "../../context/Authcontext"
export default function Individualuser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {data:user}=useAuth()
  const { data, loading, error: err, execute } = useFetchData(getIndividualUser);
  useEffect(() => {
       execute(id);
  }, [id])

  const isValid = authUid(id);
  if (!isValid) return <Errorloading data={{ error: 'Incorrect uid please enter correct uid' }} />
  if (loading) {
    return <Loading />
  }
  console.log('data', data)
  const { profile_pic_url, fname, lname, email, education, experience_years, resume_url, skills } = data || {}
  const splitUrl=resume_url?.split("/");
  const originalName=splitUrl[splitUrl?.length-1];

  return (
    <div className='max-w-3xl mx-auto p-6 space-y-6'>
      {data &&
        <div className='grid'>
          <div className='flex justify-center mb-4'>
            <img src={profile_pic_url || defaultImage} alt='profile'
              className='h-32 w-32 rounded-full object-cover border-4 border-gray-300 shadow-lg' />
          </div>
          <span className='grid justify-center mt-4'> <Linkcomps to={'profile-picture'} content={<ButtonComps values='Change Photo' />}></Linkcomps></span>
          <div className='grid justify-center mb-4'>
            <h1 className='text-2xl font-bold text-center transition-colors'>{fname} {lname}</h1>
            <span className="px-3 py-1 text-sm bg-blue-600 rounded-full text-white">{user?.role=='guest'? 'Job Seeker':user?.role=='admin'?'Admin':'Recruiter'}</span>
            <p className='text-gray-600 text-center mb-4'>{email}</p>
            <Textcomps content={`Education: ${education}`} />
            <Textcomps content={`Experience: ${experience_years ?? '0'} years`} />
            <span className='my-4 justify-center grid cursor-pointer'> <Linkcomps to={'profile-picture'} content={<ButtonComps values='Edit Profille' />}></Linkcomps></span>
          </div>
          <div className='flex flex-wrap just align-middle gap-2 text-gray-400 text-2xl'>
            <h4>Skills:</h4>
            {(!skills || skills.length == 0) && <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">No skills added</div>}
            <div className='grid grid-cols-3 lg:grid-cols-4 gap-2'>
              {skills && skills.map((u, i) => <p key={i} className='bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium'>{u}</p>)}
            </div>
          </div>
          <Popup id={id} navigate={navigate} content={"Add Skills"}/>
          <Errorloading data={{ error: err }} />

          <div className='flex flex-wrap gap-3 mt-6 pt-4 border-t'>
            <Textcomps content={'Resume'}/>
            {resume_url ? <Textcomps  style={'text-red-500'} content={'No Resume Added Please First Add the Resume'}/>: <Textcomps content={originalName}/>}
            <div className='flex gap-6'>
              {resume_url && <Linkcomps content={'View Resume'} to={resume_url}/>}
              <Link to='resume'><Buttoncomps values="Upload Resume" /></Link>
            </div>
            </div>
        </div>
      }
    </div>
  )
}
