 const validateLogin = ({ email, password }) => {
  if (!email) return "Please Enter Emails";
  if (!password) return "Please Enter Password";

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!emailRegex.test(email)) return "Invalid email format.";
  if (!passwordRegex.test(password)) return "Invalid password format.";

  return null;
};
export default validateLogin;