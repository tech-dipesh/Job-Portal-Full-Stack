import connect from "../db.js"
import tableDataFetch from "../utils/tableDataFetch.js"

const getallSaveJob=async(req, res)=>{
  const {uid}=req.user;
  const {rows}=await connect.query("select * from saved_jobs where users_id=$1", [uid]);
  return res.status(200).json({message: rows})
}

const storeSaveJob=async (req, res)=>{
  const {uid}=req.user;
  const {id}=req.params;
  if(!id){
    return res.status(404).json({message: "Please Enter Jobs id to bookmarked jobs"});
  }
  try {
    
    const {rowCount}=await connect.query("select job_id, users_id from saved_jobs where job_id=$1 and users_id=$2", [id, uid]);
    if(rowCount>0){
      return res.status(401).json({message: "The Jobs is already Bookmarked don't need to bookmark again"});
    }
    const {rows}=await connect.query("insert into saved_jobs (job_id, users_id) values ($1, $2) returning *", [id, uid])
    res.status(201).json({message: rows[0]})
  } catch (error) {
    return res.status(403).json({message: error.message})
  }
}

const unsaveListJob=async (req, res)=>{
  const {uid}=req.user;
   const {id}=req.params;
  if(!id){
    return res.status(404).json({message: "Please Enter Jobs id to bookmarked jobs"});
  }
  try {
    await connect.query("delete from saved_jobs where job_id=$1 and users_id=$2", [id, uid]);
    return res.status(201).json({message: 'Successfully Removed jobs from bookmark'})
  } catch (error) {
    return res.status(403).json({message: error.message})
  }
}

export {storeSaveJob, getallSaveJob, unsaveListJob}