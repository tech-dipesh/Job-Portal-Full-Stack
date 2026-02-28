import jwt from "jsonwebtoken"
import "dotenv/config"
import connect from "../db.js"

const authUserMiddleware = async(req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: 'No token Please Loged in First' });
  try {
    req.user = jwt.verify(token, process.env.JSON_SECRET_KEY); 
    if(req.user.userVerified==false){
      return res.status(401).json({message: "Please Verify Your Send to your mail."})
    }
    next();
  } catch(err) {
    console.log(err)
    return res.status(403).json({ message: 'Invalid token Please Logged in First' });
  }
};

export default authUserMiddleware;