import React from 'react'
import Loading from '../Loading';
import { toast } from 'react-toastify';

export default function Errorloading({data}) {
  let {error, loading}=data;
    return (
    <>
      {/* {error && <div className='text-red-500 text-xl justify-center grid justify-items-center'>{typeof error=='string'?error:"Something Went Wrong"}</div>} */}
      {error && <span>{toast.error(error)}</span>}
      {loading && <Loading/>}
    </>
  )
}
