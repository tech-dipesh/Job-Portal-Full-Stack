import React, { useState } from 'react'
import Inputcomps from "../../components/Input"
import UseFetchData from '../../hooks/useFetchData'
import Buttoncomps from "../../components/Button"
import { uploadProfilePicture } from "../../api/auth.user"
import validateFileUpload from "../../auth/validateFileUpload"
export default function ProfilePhoto() {
  const [file, setFile] = useState({ name: '', type: '', size: '' })
  const [content, setContent] = useState()
  const [success, setSuccess] = useState()
  const [error, setError] = useState()

  const handleUpload = (e) => {
    setError()
    if (e.target.files.length > 0) {
      const file = e.target?.files[0];
      setContent(file)
      const name = file.name
      const splitFileName = file.name.split(".")[1];
      const totalSize = (file.size) / 1000;
      setFile({ name, type: file.type, size: totalSize })
    }
  }
  const { error:errState, loading, execute } = UseFetchData(uploadProfilePicture)

  const fileUpload = async () => {
    const err=validateFileUpload(file, 'image')
    if(err){
      setError(err)
      return
    }
    const formData = new FormData();
  
  formData.append('profile', content);
    await execute(formData).then(t =>{
      setSuccess(t?.message || 'File Upload') 
    }
  );
}
if(loading){
  return 
}
return (
  <div>
    <h2>Add Your Profile Photo</h2>
    {loading && <div>Loading...</div>}
    {errState && <div className='text-red-500'>{errState}</div>}
    {success && <div className='text-green-500'>{success}</div>}
    <form encType="multipart/form-data" method="post" onChange={handleUpload}>
      <Inputcomps type='file' name='profile'/>
    </form>
    <div onClick={fileUpload}>
      <Buttoncomps values='submit' />
    </div>
  </div>
)
}
