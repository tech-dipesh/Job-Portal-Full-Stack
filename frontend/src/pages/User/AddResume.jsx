import React, { useState } from 'react'
import Inputcomps from "../../components/Input"
import UseFetchData from '../../hooks/useFetchData'
import Buttoncomps from "../../components/Button"
import { uploadResume } from "../../api/auth.user"
import validateFileUpload from "../../auth/validateFileUpload"
export default function Addresume() {
  const [file, setFile] = useState({ name: '', type: '', size: '' })
  const [content, setContent] = useState()
  const [success, setSuccess] = useState()
  const [error, setError] = useState()

  const handleUpload = (e) => {
    setError()
    if (e.target.files.length > 0) {
      const file = e.target?.files[0];
      setContent(file)
      const name = file.type
      const splitFileName = file.name.split(".")[1];
      const totalSize = (file.size) / 1000;
      setFile({ name, type: splitFileName, size: totalSize })
    }
  }
  const { error:errState, loading, execute } = UseFetchData(uploadResume)

  const fileUpload = async () => {
    const err=validateFileUpload(file, 'pdf')
    if(err){
      setError(err)
      return
    }
    const formData = new FormData();
  
  formData.append('resume', content);
  console.log('form', formData)
    await execute(formData).then(t =>{
      setSuccess(t?.message || 'Resume Upload') 
    }
  );
}
return (
  <div>
    <h2>Upload Your Resume</h2>
    {loading && <div>Loading...</div>}
    {error && <div className='text-red-500'>{error}</div>}
    {errState && <div className='text-red-500'>{errState}</div>}
    {success && <div className='text-green-500'>{success}</div>}
    <form encType="multipart/form-data" method="post" onChange={handleUpload}>
      <Inputcomps type='file' name='resume'/>
    </form>
    <div onClick={fileUpload}>
      <Buttoncomps values='submit' />
    </div>
  </div>
)
}
