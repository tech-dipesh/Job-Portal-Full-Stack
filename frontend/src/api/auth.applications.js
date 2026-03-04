import api from "../lib/axios.js"

export const getAllAppliedJobs=()=>api.get(`/applications/applylist`);
export const getAllJobsApplicant=(id)=>api.get(`/applications/${id}/applist`);
export const applyToParticularJob=({id, status='applied'})=>api.post(`/applications/${id}/apply`, {status});
export const withdrawToParticularJob=(id)=>api.delete(`/applications/${id}/withdraw`);