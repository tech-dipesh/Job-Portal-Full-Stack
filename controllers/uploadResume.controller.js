import {createClient} from "@supabase/supabase-js"
import connect from "../db.js"
const supabase=createClient(process.env.URL_SUPABASE_CONNECT, process.env.ANON_KEY_SUPABASE)
const uploadResume=  async (req, res)=>{
  const {uid: userId}=req.user;
  const {buffer}=req.file
  const {fieldname, originalname}=req.file;
  const wow="8b48e19b-9efb-47a6-940b-03edd6f760eb";

  try {
    // const {rows: doesExist}=await connect.query("SELECT EXISTS (SELECT resume_url FROM users WHERE uid=$1)", [userId]);
    const {rows: doesExist, rowCount}=await connect.query("SELECT resume_url FROM users WHERE uid=$1", [userId]);
    const { data:r } = await supabase.storage.from('resume').list('');
 console.log(r.map(f => f.name)); 
 
    if(rowCount && doesExist[0].resume_url){
      const {resume_url: resumeUrl}=doesExist[0];
      const splitWorld=resumeUrl.split("/")
      const removetoPath=`upload/${splitWorld[splitWorld.length-1]}`
      console.log(removetoPath)
     const {data:result, error}= await supabase.storage.from('resume').remove([removetoPath])
    //  const {data:list, error: dataerror}= await supabase.storage.from('resume').list('upload')
    //  console.log('list', list, dataerror)
    //  console.log('error', error)
    //  console.log('result', result)
     }
    const randomUUID=crypto.randomUUID()
    const {data, error}=await supabase.storage.from('resume').upload(`upload/${randomUUID}-${originalname}`, buffer, {contentType: 'application/pdf'})
    if(error){
      return res.status(502).json({message: error.message})
    }
    console.log(error)
    const {path}=data;
    const {data: getOutputUrl}=supabase.storage.from('resume').getPublicUrl(path)
    const {publicUrl}=getOutputUrl
    const {rows}= await connect.query("update users set resume_url=$1 where uid=$2 returning *", [publicUrl, userId])
   return res.status(201).json({message: rows[0]})
  } catch (error) {
    console.log(error)
    res.status(401).json({message: error.message})
  }
}



const uploadProfilePicture=async (req, res)=>{

}
export {uploadResume, uploadProfilePicture};
