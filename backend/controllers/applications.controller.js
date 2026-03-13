import express from "express"
import connect from "../db.js"
import applicationSchema from "../Models/applications.models.js";
import validateFunUid from "../utils/ValidateFunUid.js";


export const allAppliedJobs=async (req, res)=>{
  const {uid}=req.user;
  try {
    const {rows}=await connect.query("select j.title, j.description, j.job_type, a.applied_at, j.experience_years, a.status, a.uid from jobs j inner join applications a on a.job_id=j.uid where user_id=$1", [uid]);
    return res.status(201).json({message: rows})
  } catch (error) {
    return res.status(201).json({message: error.message})
  }
}

export const particularJobsListController=async(req, res)=>{
  const {id}=req.params;
  try {
    const {rows}=await connect.query("SELECT CONCAT(u.fname,' ', u.lname) AS full_name, u.experience, u.resume_url, u.skills AS user_skills, a.status, a.applied_at FROM applications a INNER JOIN users u ON a.user_id = u.uid WHERE a.job_id=$1;", [id]);
    return res.json({message: rows})
  } catch (error) {
     return  res.status(504).json({message:error.message})
  }
}
export const applyJobApplicationController=async (req, res)=>{
  const {uid}=req.user;
  const {id: job_id}=req.params;

  try {
    const {rowCount, rows: appliedList}=await connect.query("select job_id, status from applications where user_id=$1 and job_id=$2", [uid, job_id])
    if(rowCount>0 && appliedList[0].status=='applied'){
      return res.status(401).json({message: "You've Already Applied"})
    }
    await connect.query("insert into applications (user_id, job_id, status) values ($1, $2, 'applied')", [uid, job_id])
    return res.status(201).json({message: "You've Successfully applied to the role."})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}



export const withdrawJobApplicationController= async (req, res)=>{
  const {id: job_id}=req.params;
  const {uid}=req.user;
  try {
    const {rows}=await connect.query("select exists(select 1 from applications where job_id=$1 and user_id=$2);", [job_id, uid]);
    if(!rows[0].exists){
      return res.status(204).json({message: "No id Data Exist"})
    }
    await connect.query("delete from applications where job_id=$1 and user_id=$2", [job_id, uid])
    return res.status(204).json({message: 'Successfully Withdraw from applications'});
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}



// export const changeApplicationStatus
export const changeApplicationStatus=async (req, res)=>{
  const {id:job_id}=req.params;
  let {status, user_id}=req.body;
  const err=validateFunUid(user_id);
  if(err){
    return res.status(422).json({message: err})
  }
  try {
    const validateApplication=applicationSchema.safeParse({status});
    if(!validateApplication.success){
      const message=validateApplication.error.issues.map(m=>m.message);
      return res.status(422).json({message})
    }
    const {rowCount, rows}=await connect.query("select job_id, status from applications where user_id=$1 and job_id=$2", [user_id, job_id])
    if(rows.length==0){
      return res.status(422).json({message: "You've Not Applied Please First Apply."})
    }
    if( rows[0].status==status){
     return res.status(401).json({message: "Please Change the Application Status"})
   }
    await connect.query("update applications set status=$1 where user_id=$2 and job_id=$3", [status, user_id, job_id])
    return res.status(201).json({message: "Application Status Updated Successfully"});
  } catch (error) {
    return res.status(201).json({message: error.message})
  }
}
