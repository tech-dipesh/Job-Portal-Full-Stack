import api from "../lib/axios.js"


export const savedJobsList=()=>api.get(`/jobs/saved_jobs/list`);
export const bookMarkJob=(id)=>api.post(`/jobs/${id}/bookmark_job`);
export const removeBookmark=(id)=>api.delete(`/jobs/${id}/remove_from_bookmark`);
export const allJobsList=({page, limit})=>api.get(`/jobs?page=${page}&limit=${limit}`);
export const searchJobs=(query)=>api.get(`/jobs/search?title=${query}`);
export const individualJobs=(id)=>api.get(`/jobs/${id}`);
export const postNewJobs=(content)=>api.post(`/jobs/new`, content);
export const updateExistingJobs=({id, ...content})=>api.put(`/jobs/${id}/edit`, content.value);
export const deleteExistingJobs=(id)=>api.delete(`/jobs/${id}/delete`);