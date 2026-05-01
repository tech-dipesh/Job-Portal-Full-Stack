import "dotenv/config"
import {readdirSync, readFileSync} from "node:fs"
import {extname, join} from "node:path"
import connect from "../src/db.js"

const runMigration=async()=>{
  try {
    const {dirname}=import.meta;
    const files = readdirSync(dirname)
    for(let i=0;i<files.length;i++){
      const filePath = join(dirname, files[i]);
      if(extname(filePath)==='.sql'){
        const command=readFileSync(filePath, "utf-8")
        console.log(command);
        await connect.query(command)
      }
    }
    console.log('Migration Successful')
    process.exit()
  } catch (error) {
    console.log(error)
  }finally{
    await connect.end();
  }
}
runMigration()