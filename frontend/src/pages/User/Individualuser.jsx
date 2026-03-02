import React, { useEffect, useState } from 'react'
import { getIndividualUser, postUserSkills } from '../../api/auth.user';
import { Link, useNavigate, useParams } from 'react-router';
import authUid from "../../auth/authUid"
import Inputcomps from "../../components/Input"
import ButtonComps from '../../components/Button';
import validateText from "../../auth/textValidate"
export default function Individualuser() {
   const navigate = useNavigate();
  const {id}=useParams();

  const [user, setUsers]=useState([]);
  const [error, setError]=useState()
  const [isSkillsOpen, setIsSkillOpen]=useState(false)
  const [skill, setSkills]=useState()

  const getValueAll=async()=>{
    try {
      const {data}=await getIndividualUser(id);
      setUsers(data)
    } catch (error) {
      if(!error.response){
        return setError("Network Error")
      }
      const {status, data}=error.response;
      if(status==403){
        return setError("Only Admin Alllowed You're not a owner.")
      }
      setError(data?.message)
    }
  }
  useEffect(()=>{
    getValueAll()
  }, [])

  const submitSkill=async()=>{
    console.log('skkils', skill)
    const err=validateText(skill);
    if(err){
      return setError(err)
    }
    try {
      const {data}=await postUserSkills(skill, id);
      console.log('data', data)
      setTimeout(() => {
        navigate(0)
      }, 1000);
    } catch (error) {
      const {data}=error.response
      console.log(data.message)
      setError(data.message)
    }
  }
  const isValid=authUid(id);
  if (!isValid) return <div>Incorrect uid please enter correct uid</div>
if (error) return <div className='text-red-500'>{error}</div>

console.log('user', user)
return (

  <div>
    <div>
    <img src={user.profile_pic_url} alt='profile' className='h-20 w-20 rounded-full object-cover'/>
    <h2>your Profile Picture:</h2>
    <h2>Full Name: {user.fname}{user.lname}</h2>
    <h3>Education: {user.education}</h3>
    <h3>Email: {user.email}</h3>
    
    <h3>Experience: {user.experience_years}</h3>
    <h3>Profile Pic url: {user.profile_pic_url ?? 'none'}</h3>
    <Link to={user.resume_url} target='_blank' className='text-blue-300 underline'> {user.resume_url ?? 'none'}</Link>
    <h4>Skills:</h4>
    <div className='flex gap-8 text-gray-400 text-2xl'>
      {user.skills && user.skills.map((u, i)=>
      <p key={i}>{u}</p>
    )}
    </div>
    </div>
    <div>
      <h3>Add User Skills:</h3>
      <div onClick={()=>setIsSkillOpen(true)}><ButtonComps values='Add Skill'/> </div>
      {isSkillsOpen &&
      <div>
        <Inputcomps placeholder='New Skill' type='text' click={setSkills} value={skill}/>
        <div onClick={submitSkill}>
        <ButtonComps values='Submit'/>
        </div>
      </div>
      }
    </div>
    <Link to='edit'><ButtonComps values="Edit Profile"/></Link>
    <Link to='profile-picture'><ButtonComps values="Add Profile Picture"/></Link>
    <Link to='resume'><ButtonComps values="Upload Resume"/></Link>
  </div>
  )
}
