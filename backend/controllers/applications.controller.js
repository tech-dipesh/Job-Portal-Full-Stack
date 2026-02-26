import express from "express"
import connect from "../db.js"
import applicationSchema from "../Models/applications.models.js";

export const applyJobApplicationController=async (req, res)=>{
  const {id: job_id}=req.params;
  try {
    const {status}=req.body;
    const validateApplication=applicationSchema.safeParse({status});
    if(!validateApplication.success){
      const message=validateApplication.error.issues.map(m=>m.message);
      return res.status(404).json(message)
    }
    const {uid: user_id}=req.user;
    const {rowCount, rows: appliedList}=await connect.query("select job_id, status from applications where user_id=$1 and job_id=$2", [user_id, job_id])
    if(rowCount>0 && appliedList[0].status==status){
      return res.status(402).json({message: "You've Already Applied"})
    }
    if(rowCount>0){
      await connect.query("update applications set status=$1 where user_id=$2 and job_id=$3", [status, user_id, job_id])
      return res.status(401).json({message: "Application Status Updated Successfully"});
    }
    const {rows}=await connect.query("insert into applications (user_id, job_id, status) values ($1, $2, $3) returning *", [user_id, job_id, status])
    return res.status(201).json(rows[0])
  } catch (error) {
    console.log(error)
  }
}



export const withdrawJobApplicationController= async (req, res)=>{
  const {id: job_id}=req.params;
  try {
    await connect.query("delete from applications where job_id=$1", [job_id])
    return res.status(200).json({message: 'Successfully Withdraw from applications'});
  } catch (error) {
    res.status(401).json({message: "Invalid Id Please Try With Correct credentials"})
    
  }
}
