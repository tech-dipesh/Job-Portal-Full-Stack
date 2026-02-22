import express from "express";

import cookieParser from "cookie-parser";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.status(201).json({ message: "Homepage" });
});

app.use((req, res)=>{
  const {url}=req;
  return res.status(404).json({message: `The Page You're looking for: ${url} doesn't exist`})
})

app.listen(port, () => {
  console.log(`App is listening on the ${port}`);
});
