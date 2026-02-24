import express from "express";
import bcrypt, { hash } from "bcryptjs";
import connect from "../db.js";
import tableDataFetch from "../services/tableDataFetch.js";
import companySchema from "../Models/companies.models.js";
import jwt from "jsonwebtoken";

export const getCompanyController= async(req, res) => {
  const {id}=req.params;
  if(!id){
    return res.status(404).json({message: "Please Enter Id For Get the element;"})
  }
  try {
    const {rows, rowCount}=await connect.query("select * from companies where uid=$1", [id]);
    if(!rowCount){
      return res.json({message: "Please Enter Correct Uid:"})
    }
    return res.status(200).json(rows[0])
  } catch (error) {
    return res.status(404).json({message: "Please Enter Correct Uid"})
  }
};


export const postCompanyController=async (req, res) => {
  const {name, description, website}=req?.body;
  const allList={name, description, website};
  const validateAllInput=companySchema.safeParse(allList);
   if(!validateAllInput.success){
      const message=validateAllInput.error.issues.map(m=>m.message);
      return res.status(404).json(message)
    }
  const {rowCount}=await connect.query("select * from companies where name=$1", [name]);
  if(rowCount){
    return res.status(402).json({message: "Company is Already Registed"});
  }
  const {rows}=await connect.query("insert into companies (name, description, website) values ($1, $2, $3) returning *", [name, description, website])
  return res.json(rows[0]);
}


export const deleteCompanyController= async(req, res) => {
  const {id}=req.params;
    if(!id){
    return res.status(404).json({message: "Please Enter Id For Delete the element;"})
  }
  try {
    const {rows, rowCount}=await connect.query("delete from companies where uid=$1", [id]);

    if(!rowCount){
      return res.json({message: "Please Enter Correct Uid:"})
    }
    const data=await tableDataFetch('companies')
    return res.status(200).json({message: "Id Deleted Succssfully"})
  } catch (error) {
    return res.status(404).json({message: "Please Enter Correct Uid"})
  }
};


export const putCompanyController= async(req, res) => {
  const {id}=req.params;
  const {name, description, website}=req.body;
   if(!name || !description || !website){
    return res.json({message: "Please Enter all value"})
  }
    const allList={name, description, website};
  const validateAllInput=companySchema.safeParse(allList);
   if(!validateAllInput.success){
      const message=validateAllInput.error.issues.map(m=>m.message);
      return res.status(404).json(message)
  }
  try {
    const {rows, rowCount}=await connect.query("update companies set name=$1, description=$2, website=$3 where uid=$4 returning *", [name, description, website, id])
    console.log(rowCount)
    if(!rowCount){
      return res.status(404).json({message: "Please Enter Id For Get a information"})
    }
    res.status(200).json(rows[0])
  } catch (error) {
    console.log(error)
    res.json({message: error.message})
  }
};

