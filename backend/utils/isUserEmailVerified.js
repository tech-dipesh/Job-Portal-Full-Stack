import connect from "../db.js";
async function isUserVerifiedEmail(uid) {
  try {
    const { rows, rowCount} = await connect.query(
      "select exists (select from email_verified where user_id=$1 order by expired_at desc);",
      [uid],
    );
    if(rowCount==0){
      return false;
    }
    const { is_verified } = rows[0];
    if(is_verified==true){
      return true;
    }
    else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
export default isUserVerifiedEmail;
