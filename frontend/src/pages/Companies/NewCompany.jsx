import useFetchData from '../../hooks/useFetchData';
import { postNewCompany } from '../../api/auth.companies';
import Inputcomps from "../../components/common/Input" 
import { useState } from 'react';
import ButtonComps from "../../components/common/Button"
import validateCompany from '../../auth/ValidateCompany';
import { useNavigate } from 'react-router';
import Errorloading from '../../components/common/Errorloading';
export default function NewCompany() {
  const [value, setValue]=useState({name: '', description: '', website: '', founded_year: '', location: ''})
  const [Error, setError]=useState("")
  const {data, error, loading, execute}=useFetchData(postNewCompany);
  const navigate=useNavigate()
  const submitForm=async(e)=>{
    e.preventDefault()
    const err=validateCompany(value)
    if(err){
      setError(err)
      return;
    }
    await execute(value);
    if(data){
      navigate("../all")
      return;
    }
    if(error){
      setError(error)
      return;
    }
  }
  
  return (
    <div>
      <h1>New Company.</h1>
      <form onSubmit={submitForm} className='w-full space-y-4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md'>
          <h3>Name</h3>
          <Inputcomps placeholder='Name' name='name' type='text' value={value.name} click={setValue} error={setError}/>
          <h3>Description</h3>
          <Inputcomps placeholder='Description' name='description' type='text' value={value.description} click={setValue} error={setError}/>
          <h3>Website</h3>
          <Inputcomps placeholder='Website' name='website' type='text' value={value.website} click={setValue} error={setError}/>
          <h3>Founded Year</h3>
          <Inputcomps placeholder='Founded Year' name='founded_year' type='number' value={value.founded_year} click={setValue} error={setError}/>
          <h3>Location:</h3>
          <Inputcomps placeholder='Company Location' name='location' type='text' value={value.location} click={setValue} error={setError}/>
          <hr />
          <ButtonComps values='Submit'/>
      </form>
      <Errorloading data={{error, loading}}/>
    </div>
  )
}
