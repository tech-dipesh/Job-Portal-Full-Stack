import connect from "../db.js";
import jwt from "jsonwebtoken"
async function verifyEmailConfirmation(req, res) {
  try {
    const {token}=req.cookies;
    const {userVerified}= jwt.verify(token, process.env.JSON_SECRET_KEY); 
    if(token && userVerified==true){
        res.status(204).json({message: "User Is Already Verified"})
    }
    
    const {code, email}=req.body;
    if(!code || !email){
      return res.status(404).json({message: "Please Enter Verification Code and Email"})
    }
    console.log(code, email)
    const {rows} =await connect.query("select e.verified_code, e.expired_at e.uid, u.email from email_verified e inner join users u on u.uid=e.user_id")
    const filterThatMail=rows.filter(row=>row.email==email)
    if(filterThatMail.length===0){
      return res.status(201).json({message: "Please Enter Correct Code"})
    }
    const {uid: userId}=filterThatMail[0];
   await connect.query(`update email_verified set is_verified=true where uid=$1`, [userId]);
    return res.json({message: "Verification Code Have Been Succssfully Verified"})
  } catch (error) {
    console.log(error)
    return res.status(201).json({message: error.message})
  }
}


export const resendVerificationCode=(req, res)=>{

  res.status(201).json({message: 'hello'})
}
export default verifyEmailConfirmation;