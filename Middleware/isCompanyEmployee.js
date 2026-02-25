import jwt from "jsonwebtoken"
import connect from "../db.js"
const isCompanyEmployee = async (req, res, next) => {
  const {uid, company_id, role}=req.user;
  const {rows, rowCount}=await connect.query("select company_id from users where uid=$1", [uid])
  // if(role=='admin'){
  //   next();
  // }
  if(rowCount==0){
    return res.status(403).json({message: "You're not a employee of the company"});
  }
  if(rows[0].company_id!=company_id){
    return res.status(403).json({message: "You're not a employee of the company"});
  }
  next();
};


export default isCompanyEmployee;