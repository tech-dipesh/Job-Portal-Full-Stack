import {z} from "zod"

const allAvaibleApplicationtype=["applied", "rejected", "hired"];

// user_id, job_id, status, applied_at.

const applicationSchema=z.object({
  status:z 
    // .string({required_error: "Please Add a education"})
    // .enum(allAvaibleEducationtype, {error: "Please Enter All Values such as, Basic, Matrix, High School, Undergraduation, Postgraduation"}),
    .enum(allAvaibleApplicationtype, {error: "Please Only Enter a Avaible Option such as, applied, rejected, hired"})
})

export default applicationSchema;