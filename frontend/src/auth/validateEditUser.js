
const validateEditUser= ({fname, lname, education, email, experience})=>{
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validEducation=['Matrix', 'High School', 'Undergraduation', 'Postgraduation'];
  console.log('education',education)
  if(!fname){
    return "Please Enter a First Name"
  }
  if(fname.length<2){
    return "Please enter at least 2 digit firstname"
  }
  if(!lname){ 
    return "Please Enter a Last Name"
  }
  if(lname.length<2){
    return "Please enter at least 2 digit lastname"
  }
  if(!education){
    return "Please Enter a Education"
  }
  if(!validEducation.includes(education)){
    return "Please enter a Valid Education"
  }
  if(!email){
    return "Please Enter a Email"
  }
  if (!emailRegex.test(email)) return "Invalid email format.";
  if(!experience){
    return "Please Enter a experience"
  }
  if(experience<0 || experience>35){
    return "Please Enter a valid experience Years."
  }
}
export default validateEditUser