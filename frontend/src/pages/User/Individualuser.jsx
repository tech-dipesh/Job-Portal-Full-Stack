import React, { useEffect, useState } from 'react'
import { getIndividualUser, postUserSkills, uploadProfilePicture } from '../../api/auth.user';
import { Link, useNavigate, useParams } from 'react-router';
import authUid from "../../auth/authUid"
import Inputcomps from "../../components/Input"
import ButtonComps from '../../components/Button';
import validateText from "../../auth/textValidate"
import useFetchData from '../../hooks/useFetchData';
export default function Individualuser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isSkillsOpen, setIsSkillOpen] = useState(false)
  const [error, setError] = useState("")
  const [skill, setSkills] = useState()


  const { data, loading, error: err, execute } = useFetchData(getIndividualUser);
  const {data: profileData, execute: addprofile}=useFetchData(postUserSkills)
  useEffect(() => {
    ; (async () => {
      await execute(id);
    })()
  }, [])

  const isValid = authUid(id);
  if (!isValid) return <div>Incorrect uid please enter correct uid</div>
  const submitSkill = async () => {
    const err = validateText(skill);
    if (err) {
      return setError(err)
    }
    await addprofile(skill)
    setTimeout(() => {
      navigate(0)
    }, 200);
  }
  console.log('data', profileData)

  return (
    <div>
      {error || err && <div className='text-red-500'>{error || err}</div>}
      {loading && <div>Loading...</div>}
      {data &&
        <div>
          <img src={data.profile_pic_url} alt='profile' className='h-20 w-20 rounded-full object-cover' />
          <h2>your Profile Picture:</h2>
          <h2>Full Name: {data.fname}{data.lname}</h2>
          <h3>Education: {data.education}</h3>
          <h3>Email: {data.email}</h3>

          <h3>Experience: {data.experience_years}</h3>
          <h3>Profile Pic url: {data.profile_pic_url ?? 'none'}</h3>
          <Link to={data.resume_url} target='_blank' className='text-blue-300 underline'> {data.resume_url ?? 'none'}</Link>
          <h4>Skills:</h4>
          <div className='flex gap-8 text-gray-400 text-2xl'>
            {data.skills && data.skills.map((u, i) => <p key={i}>{u}</p>)}
          </div>
          <h3>Add User Skills:</h3>
          <div onClick={() => setIsSkillOpen(true)}><ButtonComps values='Add Skill' /></div>
          {isSkillsOpen &&
          <>
            <div> <Inputcomps placeholder='New Skill' type='text' click={setSkills} value={skill}/></div>
              <div onClick={submitSkill}><ButtonComps values='Submit' /></div>
          </>  }
              <Link to='edit'><ButtonComps values="Edit Profile" /></Link>
              <Link to='profile-picture'><ButtonComps values="Add Profile Picture" /></Link>
              <Link to='resume'><ButtonComps values="Upload Resume" /></Link>
              {data.is_employee && <ButtonComps values="You're a employee." />}
        </div>
      }
    </div>
  )
}
