import axios from 'axios';
import React, { useState } from 'react'
import {useNavigate} from "react-router"
import validateLogin from "../auth/authLogin.js"
import loginUser from "../api/Login.js"

export default function Login() {
  const [value, setValue] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setValue((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const err = validateLogin(value);
    if (err) return setError(err);

    try {
      const { data } = await loginUser(value);
      setSuccess(data);
      navigate("../");
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };
  
  const input='bg-transparent h-10 w-72 rounded-lg text-white placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none'
  const button='opacitiy-85 cursor-pointer bg-blue-500 font-semibold  py-2 px-4 rounded m-2';
  console.log('success', success)
  return (
    <div className='bg-slate-700 h-2/4'>
      <form action="" onSubmit={submitForm} className='  gap-8 flex justify-center flex-wrap'>
        <input type="email" placeholder='Please Enter a Email' className={input} value={value.email} 
        onChange={handleChange('email')}
      />
        <input type="password" placeholder='Please Enter a Password' className={input} value={value.password} 
        onChange={handleChange('password')}/>
        <input type="submit" className={button}/>
      </form>
       {error && <div className="flex justify-center text-red-400">{error}</div>}
      {success && <div>Hi: {success.fname} {success.lname}</div>}
    </div>
  )
}
