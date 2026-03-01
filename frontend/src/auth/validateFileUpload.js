const validateFileUpload= (value, content)=>{
  console.log('value', value)
  if(!value.name){
    return "Please Upload a file."
  }

  console.log('value', value)
  if(value.type!=content){
    return `Only ${content} is allowed`
  }
  if(!value.name){
    return "Please Add a file."
  }
  if(value.size>1000){
    return "file Can't be more than 1.5mb."
  }
  return null;
}
export default validateFileUpload;