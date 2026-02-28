import React, { useState } from 'react'
import api from '../services/api';
import validateVerifyMail from '../auth/authVerifyMail';

export default function VerifyEmail() {
  const [value, setValue] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const verifyYourMail = async (e) => {
    const err = validateVerifyMail(value);
    if (err) return setError(err);
    try {
      const { data } = await loginUser(value);
      setSuccess(data);
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  }
  const input = 'bg-transparent h-10 w-72 rounded-lg text-white placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none'
  const button = 'opacitiy-85 cursor-pointer bg-zinc-900 font-semibold  py-2 px-4 rounded m-2';
  const sbutton = 'opacitiy-85 cursor-pointer bg-gray-500 font-semibold  py-2 px-4 rounded m-2';
  const tbutton = 'opacitiy-85 cursor-pointer bg-slate-700 font-semibold  py-2 px-4 rounded m-2';

  return (
    <div className='flex justify-center'>
      <h1>Verify Your Mail</h1>
      <form onSubmit={verifyYourMail}>
        <input type="number" placeholder='Please Enter a Number' value={value} onClick={(e) => setValue(e.target.value)} />
        <input type="submit" />
      </form>
      {
        error && <div>{error}</div>
      }
      {
        success && <div>{success}</div>
      }
      <div>
        <button className={button}>first button</button>
        <button className={sbutton}>second button</button>
        <button className='opacitiy-85 cursor-pointer bg-green-500 font-semibold  py-2 px-4 rounded m-2'>second button</button>
        <button className={tbutton}>thid button</button>
        <button class="btn btn-primary">Primary</button>

        <button class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 duration-500">
            my content
        </button>
      </div>
    </div>
  )
}
