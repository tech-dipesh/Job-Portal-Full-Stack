import React from 'react'

export default function InputComps({placeholder, type, value, click, error, name}) {
  if(error==undefined) error=function(){}
  if(click==undefined) click=function(){}
  return (
    <input type={type} className='bg-transparent h-10 w-72 rounded-lg text-black dark:text-white placeholder-transparent ring-2 px-2  ring-gray-500 focus:ring-sky-600 focus:outline-none' placeholder={`Please Enter a ${placeholder}`} value={value} onChange={(e)=>{
  //     // setValue(e.target.value)
      click((prev)=>({...prev, [name]: e.target.value}))
      error("")
    }}/>
  )
}
