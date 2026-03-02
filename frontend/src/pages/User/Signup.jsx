import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router"
import { signupUser } from '../../api/auth.user';
export default function Signup() {
  const [value, setValue] = useState({
    fname: "Sanjib",
    lname: "Khatri",
    education: "High School",
    email: "hello@gmail.com",
    password: "Hello@123"
  })
  const [isError, setIsError] = useState(false)
  const [success, setSuccess] = useState();

  const handleChange = (field) => (e) => {
    setValue((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signupUser(value);
      setSuccess(data?.message)
      setValue({})
    } catch ({ response }) {
      console.log(response)
      setIsError(true)
      setSuccess(response?.data?.message)
    }
  }
  const input = 'bg-transparent h-10 w-72 rounded-lg text-white placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none'
  const button = 'opacitiy-85 cursor-pointer bg-blue-500 font-semibold  py-2 px-4 rounded m-2';
  console.log('success', success)
  return (
    <div className='grid justify-center'>
      <h2 className='font-bold grid align-middle justify-center m-8'>Welcome to the signup page:</h2>
      <form action="" onSubmit={submitForm} className='  gap-8 flex justify-center flex-wrap'>
        <input type="text" placeholder='Please Enter a First Name' className={input} value={value.fname}
          onChange={handleChange('fname')} />
        <input type="text" placeholder='Please Enter a Last Name' className={input} value={value.lname}
          onChange={handleChange('lname')} />
        <select value={value.education} onChange={handleChange('education')}>
          <option>Basic</option>
          <option>Matrix</option>
          <option>High School</option>
          <option>Undergraduation</option>
          <option>Postgraduation</option>
        </select>

        <input type="op" placeholder='Please Enter a Email' className={input} value={value.email}
          onChange={handleChange('email')}
        />
        <input type="password" placeholder='Please Enter a Password' className={input} value={value.password}
          onChange={handleChange('password')} />
        <input type="submit" className={button} />
      </form>
      {success &&
        <div className='flex text-2xl justify-center'>
          {success}
        </div>
      }
    </div>
  )
}
