import React, { useState } from 'react'
import validateVerifyMail from '../../auth/authVerifyMail';
import ButtonComps from "../../components/Button"
import InputComps from '../../components/Input';
import  {verifyUser, resendVerificationCode} from '../../api/auth.user';

import { useNavigate } from "react-router"

export default function VerifyEmail() {
  const [value, setValue] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [isResend, SetIsResend]=useState(false);
  const [resendCode, setResendCode]=useState();

  const navigate = useNavigate()
  const verifyYourMail = async (e) => {
    e.preventDefault();
    const err = validateVerifyMail(value);
    if (err) return setError(err);
    try {
      const { data } = await verifyUser(value);
      console.log('data', data)
      setSuccess(data);
    } catch ({ response }) {
      if (response?.status == 401) {
        setError(response?.data?.message)
        setTimeout(() => {
          navigate("/home")
        }, 2500);
      }
      setError(response?.data?.message);
    }
  }

  
  const verifyResendCode=async ()=>{
 
    try {
      const {data}=await resendVerificationCode()
      console.log('data', data)
    } catch (error) {
      if(!error.response){
        setError("Network Error")
      }
      console.log('error value', error.response)
      const {data, status}=error.response
      console.log(data)
      setError(data?.message || data?.error)
    }
    
  }

  console.log('error', error)
  return (
    <div className='grid align-middle justify-center'>
        <div>
        <h1 className=''>Verify Your Mail</h1>
        <form onSubmit={verifyYourMail}>
        <InputComps type='number' placeholder='Please Enter a Number' value={value} click={setValue} error={setError} />
        {/* <input type="number" placeholder='' value={value} /> */}
        <ButtonComps values='submit' />
      </form>
      {
        success && <div>{success}</div>
      }
      <div>
      </div>
      {
        error && <div className='text-red-500'>{error}</div>
      }
      </div>
         <div  className='flex align-middle my-24' >
        <h2>Resend Veify Code</h2>
      <div onClick={verifyResendCode}>
      <ButtonComps values='Resend Verification Code'/>
      </div>
        </div>
    </div>
  )
}
