import "dotenv/config"
import jwt from "jsonwebtoken"

const alreadyLoggedIn = async(req, res, next) => {
  const {token}=req?.cookies
  console.log('token is', token)
  if(token){
    const decode=jwt.verify(token, process.env.JSON_SECRET_KEY);
    if(decode){
      return res.status(200).json({message: "user Is Already Logged In Don't need to logged in again."})
    }
  }
  next();
};

export default alreadyLoggedIn;