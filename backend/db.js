import { Client } from "pg";
import "dotenv/config"

const client = new Client({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE
})

await client.connect().then(t=>{
  console.log('connected to database');
})
.catch((err)=>{
  console.log(err)
  console.log('unable to connect')
})

export default client;
