import {z} from "zod"

const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passRegex=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/
const allAvaibleJobType=["Onsite", "Remote", "Hybrid"];

const listingSchema=z.object({
  Title: z
    .string({ required_error: "Title is Required" })
    .min(2, { message: "Title must be at least 2 characters" })
    .max(25, {message: "Title can't be more than 25 characters."}),
    
  Job_Type:z
    // .string({required_error: "Please Add a Job_Type"})
    .enum(allAvaibleJobType, {error: "Please Only Enter a Avaible Option such as, Onsite, Remote, Hybrid"}),
  Salary:z
    .number({required_error: "Please Enter a Salary for the Job Listing"})
    .min(2500, "Salary can't be less than 2500")
    .max(2500000, "Salary can't be more than 25000000"),
})


export default listingSchema;