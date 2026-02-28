import React from 'react'

export default function InputComps({placeholder, type, click, value, error=null}) {
  return (
    <input type={type} className='bg-transparent h-10 w-72 rounded-lg text-black dark:text-white placeholder-transparent ring-2 px-2  ring-gray-500 focus:ring-sky-600 focus:outline-none' placeholder={placeholder} value={value} onChange={(e)=>{
      click(e.target.value)
      error("")
    }}/>
  )
}
