import nodemailer from "nodemailer"
import generateRandomNumber from "../utils/generateRandom6DigitNumber.js";
import connect from "../db.js"
const email=process.env.NODEMAILER_MY_EMAIL;

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_MY_HOST,
  port: 587,
  secure: false, 
  auth: {
    user:email,
    pass: process.env.NODEMAILER_MY_PASSWORD,
  },
});

const Title="Job Portal"
const sendMail=async(uid, firstName, lastName, userEmail)=>{
  const random6DigitNumber=generateRandomNumber();
  const content=`<div><h1>Dear ${firstName} ${lastName} Thanks for Signup on our platform</h1><h2>Below is your verification code!</h2><h3>${random6DigitNumber}</h3><p>Remember This Verification will be expired after 15 minutes</p></div>`
  try {
    const info = await transporter.sendMail({
    from: `${Title} <${email}>`,
    to: userEmail,
    subject: "Please Verify Your Email!",
    html: content,
  });
  await connect.query("insert into email_verified(user_id, verified_type, verified_code)  values($1, 'verify_mail', $2)",[uid, random6DigitNumber])
  console.log(info)
  console.log(info.response);
} catch (error) {
  console.log(error)
  return error;
}
}
export default sendMail;