import React from 'react'

export default function Selectcomps({option, value, change, error}) {
  const changeOption=(e)=>{
    // (e)=>change((prev)=>({...prev, education: e.target.value}))
    if(value){
      change((prev)=>({...prev, value: e.target.value}))
    }
    else{
      change(e.target.value)
    }
    error("")
  }
  return (
    <select value={value} onChange={changeOption} className='bg-gray-300 text-black cursor-pointer'>
      <>
      <option hidden>Select Option</option>
      {option.map(o=>(
        <option>{o}</option>
      ))}
      </>
    </select>
  )
}
