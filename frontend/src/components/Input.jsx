import React from 'react'

export default function InputComps({placeholder, type='text', value, click, error, name}) {
  if(error==undefined) error=function(){}
  if(click==undefined) click=function(){}
  const handleEveryInputChange=(e)=>{
    if(name){
      click((prev)=>({...prev, [name]: e.target.value}))
      error("")
    }
    else{
      click(e.target.value)
      error("")
    }
  }
  return (
    <input type={type} className='bg-transparent h-10 w-72 rounded-lg text-black dark:text-white placeholder-gray-400 ring-2 px-2  ring-gray-500 focus:ring-sky-600 focus:outline-none' placeholder={`Please Enter a ${placeholder}`} value={value} onChange={handleEveryInputChange}/>
  )
}
