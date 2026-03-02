import React, { useEffect, useState } from 'react'
import InputComps from '../../components/Input'
import ButtonComps from "../../components/Button"
import validateEditUser from '../../auth/validateEditUser'
import {getIndividualUser, patchIndivualUser} from "../../api/auth.user"
import { useFetcher, useNavigate, useParams } from 'react-router'
import UseFetchData from '../../hooks/useFetchData'
import useFetchData from '../../hooks/useFetchData'

export default function Edituser() {
  const navigate=useNavigate()
  const { id } = useParams();
  const [value, setValue] = useState({ fname: '', lname: '', education: '', email: '', experience: '' });
  const [error, setError]=useState("")
  const { execute: fetchUser, error: errorData, loading } = useFetchData(getIndividualUser);
  const { execute: updateUser, loading: isUpdating } = useFetchData(patchIndivualUser);
  useEffect(() => {
    fetchUser(id)
    .then(data => {
      console.log('data is', data)
      if (data) setValue(data);
    })
    .catch(c=>console.log(c))
  }, [id]);


  const submitForm = async (e) => {
    e.preventDefault();
    const err = validateEditUser(value);
    if (err) return setError(err);
    await updateUser({ id, ...value });
    setTimeout(() => {
      navigate(-1)
    }, 500);
  };
  if(loading || isUpdating){
    return <div>Loading...</div>
  }
  if(errorData){
    return <div className='text-red-500'>{errorData}</div>
  }
  return (
    <div className='justify-center align-middle'>
      <h2 className='mb-8 relative left-40'>Edit User: </h2>
      <form onSubmit={submitForm} className='grid gap-8 justify-center align-middle'>
        <InputComps
          placeholder='FirstName'
          name='fname'
          type='text'
          value={value.fname}
          click={setValue}
          error={setError} />
        <InputComps placeholder='LastName' name='lname' type='text' value={value.lname} click={setValue} error={setError} />
        <InputComps placeholder='Email' name='email' type='text' value={value.email} click={setValue} error={setError} />
        <InputComps placeholder='experience' name='experience' type='number' value={value.experience} click={setValue} error={setError} />
        <select value={value.education} onChange={(e) => setValue((prev) => ({ ...prev, education: e.target.value }))}>
          <option>Basic</option>
          <option>Matrix</option>
          <option>High School</option>
          <option>Undergraduation</option>
          <option>Postgraduation</option>
        </select>
        <ButtonComps values='Submit' />
      </form>
      {error && <div className='text-red-500 left-20 relative'>{error}</div>}
    </div>
  )
}
