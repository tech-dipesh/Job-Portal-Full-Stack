import React, { useState } from 'react'
import validateVerifyMail from '../../auth/User/Validatecodeemail';
import ButtonComps from "../../components/common/Button"
import InputComps from '../../components/common/Input';
import { verifyUser, resendVerificationCode } from '../../api/auth.user';

import { useLocation, useNavigate } from "react-router"
import useFetchData from '../../hooks/useFetchData';
import Errorloading from '../../components/common/Errorloading';
import Successcomps from '../../components/common/Success';
import { useEffect } from 'react';

export default function VerifyEmail() {
  const [value, setValue] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [isResend, SetIsResend] = useState(false);
  const [resendCode, setResendCode] = useState();

  const navigate = useNavigate()

  const { state } = useLocation();
  const { error: apierror, loading, data, execute } = useFetchData(verifyUser);
  const { error: apiresend, loading: loadresend, data: resenddata, execute: resendexecute } = useFetchData(resendVerificationCode);

  useEffect(() => {
    if (data) navigate(state?.from || "../")
  }, [data])

  const verifyYourMail = async (e) => {
    console.log('hello world')
    const err = validateVerifyMail(value);
    if (err) {
      setError(err)
      return;
    }

    await execute(value)
  }


  const verifyResendCode = async () => {
    setError("")
    const res = await resendexecute(value);

    // if(res){

    // }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='bg-neutral-800 rounded-2xl p-10 w-full max-w-lg flex flex-col items-center gap-8'>
      <Successcomps data={resenddata?.message || success} />
      <div className='text-center'>
        <h1 className='text-xl font-bold '>Verify Your Mail</h1>
        <h2 className='text-sm my-1 opacity-85 justify-center'>We've sent a 6-digit code to your email</h2>
      </div>
      <Errorloading data={{ error: apierror || error, loading }} />
      <div className='w-full flex-col items-center justify-center gap-4'>
        <InputComps type='number' placeholder='6 digit Code' value={value}  click={setValue} error={setError} />
        <span className='flex justify-center'>
          <ButtonComps values='submit' onClick={verifyYourMail}/>
        </span>
      </div>
      <div className='grid justify-items-center bg-neutral-700 rounded-lg py-4 px-2 align-middle gap-4 my-4' >
        <p className='opacity-80 text-gray-100'>Didn't receive code?</p>
          <ButtonComps values='Resend Code' onClick={verifyResendCode}/> 
          <p className='opacity-80 text-sm text-gray-300'>Please Check Your Spam Folder If You've not Recieved a Code</p>
      </div>
      </div>
    </div>
  )
}

