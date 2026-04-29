import connect from "../db.js";
import { ALL_TABLE_LIST } from "./data.js";
const dataFetch = async (name) => {
  if(!ALL_TABLE_LIST.includes(name)){
    throw new Error("Invalid Table Name:")
  }
  const { rows } = await connect.query(`select * from ${name}`);
  return rows;
};

export default dataFetch;