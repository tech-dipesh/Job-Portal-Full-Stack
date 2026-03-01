 const validateVerifyMail = (verifyCode) => {
  if(!verifyCode) return "Please Enter a code"
  if(verifyCode.length<6) return "Please Enter At Least 6 Digit Code"
  if(verifyCode.length>6) return "Please Enter Only 6 Digit Code"
  const regex= /^\d+$/;
  if(!regex.test(verifyCode)){
    return "Only Number is allowed"
  }
  return null;
};
export default validateVerifyMail;  