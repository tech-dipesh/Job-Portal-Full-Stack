import React from 'react'

export default function ButtonComps({ values, color:colors }) {
  const color=colors ? colors : 'bg-slate-700';
  return (
    <button className={`opacity-85 cursor-pointer ${color} font-semibold  py-2 px-4 rounded m-2 items-center duration-500`}>{values}</button>
  )
}
