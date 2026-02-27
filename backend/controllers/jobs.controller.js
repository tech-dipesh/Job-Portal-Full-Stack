import express from "express"
import client from "../db.js"
import tableDataFetch from "../utils/tableDataFetch.js";
import listingSchema from "../Models/jobs.models.js";
const DATALIST=["uid", "title", "description", "salary", "job_type", "is_job_open", "created_by", "created_at", "skills", "total_job_views"];
const router=express.Router();

export const getAllListingController=async (req, res) => {
  let {page, limit, sortby}=req.query;
  limit=limit??5
  page=page??1;
  sortby=sortby??'created_at'
  if(!DATALIST.includes(sortby)){
    return res.status(401).json({message: "Please Add Only Avaible column list"});
  }
  const {rows}=await client.query(`SELECT * FROM jobs where is_job_open<>'closed' order by ${sortby} desc limit $1 offset $2`, [limit, page])
  return res.status(200).json({message: rows, limit, page})
};  

export const searchJobsListing=async (req, res) => {
  const {title}=req.query;
  console.log('title', title)
  if(!title){
    const message='Please Enter Search Term'
    return res.status(204).json({message: message});
  }
  try {
    const {rows, rowCount}=await client.query("select * from jobs where search_title @@ to_tsquery($1)", [`${title}:*`]);
    console.log(rowCount)
    if(rowCount==0){
      return res.status(204).json({message: "No Content Found"})
    }
    return  res.status(200).json({message: rows})
  } catch (error) {
    return res.status(204).json({message: "No Content Found"});
  }
};


export const getListingController= async (req, res) => {
  const {id}=req.params;
  try {
    const {rows}=await client.query("SELECT * FROM jobs where uid=$1", [id])
    if(rows.length===0){
      console.log('rows', rows)
      return res.status(404).json({message: "Id Doesn't exist that you're looking for"})
    }
    await client.query("update jobs set total_job_views=(total_job_views+1) where uid=$1", [id]);
    return res.status(200).json(rows[0])
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: error.message})
  }
};

export const postListingController= async (req, res) => {
  const {Title, Description, Job_Type, Salary, skills}=req.body;
  const {company_id, uid}=req.user;
   const allListing={Title, Description, Job_Type, Salary, skills}
    const validateListing=listingSchema.safeParse(allListing);
    if(!validateListing.success){
      const message=validateListing.error.issues.map(m=>m.message);
      return res.status(404).json(message)
    }
  if(!Title || !Description || !Job_Type || !Salary){
    return res.json({message: "Enter Value to Insert output"})
  }
  try {
    // await client.query("Insert into Jobs (Title, Description, Salary, Job_Type, company_id, updated_at) values ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)", [Title, Description, Salary, Job_Type, company_id ])
    const {rows}=await client.query("Insert into Jobs (Title, Description, Salary, Job_Type, company_id, created_by, skills) values ($1, $2, $3, $4, $5, $6, $7) returning *", [Title, Description, Salary, Job_Type, company_id , uid,  skills])
    const {title, description, salary, job_type, is_job_open, skills:userSkills}=rows[0];
   return res.status(200).json({title, description, salary, job_type, is_job_open, skills:userSkills})
  } catch (error) {
    console.log('here', error)
   return res.json({message: error.message})
  }
};


export const deleteListingController= async (req, res) => {
  const {id}=req.params;
  try {
    const {rows: query}=await client.query("delete FROM jobs where uid=$1", [id])
    if(query.length===0){
        return res.json({message: "Id Doesn't exist"})
    }
    const data= await tableDataFetch('jobs')
   return res.status(200).json({data})
  } catch (error) {
    console.log(error)
    return res.json({message: error.message})
  }
};


export const putListingController= async (req, res) => {
  const {id}=req.params;
  const {Title, Description, Job_Type, Salary, company_name}=req.body;
   if(!Title || !Description || !Job_Type || !Salary){
    return res.json({message: "Please Enter a value"})
  }
  try {
    await client.query("update jobs set Title=$1, Description=$2, Job_Type=$3, Salary=$4, company_name=$5 where uid=$6", [Title, Description, Job_Type, Salary, company_name, id])
    const {rows}=await client.query("select * from jobs where uid=$1", [id])
    if(!rows){
      return res.status(404).json({message: "Please Enter Id For Get a information"})
    }
    res.status(200).json({rows})
  } catch (error) {
    console.log(error)
    res.json({message: error.message})
  }
};

export default router;