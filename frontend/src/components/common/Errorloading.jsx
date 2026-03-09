import React from 'react'

export default function Errorloading({data}) {
  const {error, loading}=data;
    return (
    <>
      {error && <div className='text-red-500 text-xl justify-center'>{error}</div>}
      {loading && <div className='text-green-500'>Loading...</div>}
    </>
  )
}
