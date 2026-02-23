import "dotenv/config"
import { Client } from "pg";

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
.catch(()=>{
  console.log('unable to connect')
})

export default client;
