import express from "express";
import {Client} from "pg"
import helmet from "helmet";
import jobListingRouter from "./routes/jobs.routes.js"
import usersListingRouter from "./routes/users.routes.js"
import companyRouter from "./routes/companies.routes.js"
import applicationRouter from "./routes/applications.routes.js"
import "dotenv/config"


import cookieParser from "cookie-parser";
import isAdminMIddleware from "./Middleware/isAdmin.js";
import authUserMiddleware from "./Middleware/isLoggedIn.js";
import rateLimit from "express-rate-limit";
const app = express();
const port = 3000;


const limitUser=rateLimit({
  windowMs: 1000*60,
  limit: 30
})

app.use(limitUser);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/jobs",  authUserMiddleware, jobListingRouter)
app.use("/users", usersListingRouter)
// app.use("/companies", authUserMiddleware, isAdminMIddleware,  companyRouter)
app.use("/companies", authUserMiddleware,  companyRouter)
app.use("/applications", authUserMiddleware, applicationRouter)

app.get("/", (req, res) => {
  res.status(201).json({ message: "Homepage" });
});

app.use((req, res)=>{
  const {url}=req;
  return res.status(404).json({message: `The Page You're looking for: ${url} doesn't exist`})
})

app.use((err, req, res, next)=>{
  if(err.message=='Unexpected field'){
    return res.status(401).json({message: "Please Enter Correct file name of: resume"})
  }
  if(err){
    return res.status(500).json({message:err.message})
  }
});

app.listen(port, () => {
  console.log(`App is listening on the ${port}`);
});
