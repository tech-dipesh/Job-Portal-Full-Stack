import api from "../lib/axios"

 export const isUserLoggedIn = () =>api.get('/users');
 export const loginUser = ({ email, password }) => api.post('/users/login', { email, password });
 export const signupUser=({fname, lname, education, email, password})=> api.post('/users/signup', {fname, lname, education, email, password})
 export const getAllUser=()=>api.get('/users/all')

 export const logoutUser=()=>api.get('/users/logout')
 export const  getIndividualUser=(id)=>api.get(`/users/${id}`)
 export const postUserSkills=(skills)=>api.get(`/users`, {skills})
 export const deleteIndivualUser=(id)=>api.get(`/users/${id}`)
 export const putIndivualUser=(data, id)=>api.put(`/users/${id}`, {data})
 export const patchIndivualUser=(data, id)=>api.patch(`/users/${id}`, {data})
 export const verifyUser = (code) =>api.post('/users/verify', { code });
 export const resendVerificationCode=()=>api.get('/users/verify/resend')
 export const forgetPassword=(email)=>api.post('/users/forget-password', {email})
 export const verifyForgetPassword=(code, newpassword, email)=>api.post('/users/forget-password', {code, newpassword, email})
 export const uploadProfilePicture=(file)=>api.post('/users/forget-password', {file})
 export const uploadResume=(file)=>api.post('/users/resume', {file})