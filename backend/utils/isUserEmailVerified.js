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
    const { is_verified: isUserVerified } = rows[0];
    return isUserVerified;
  } catch (error) {
    (error)
    return false;
  }
}
export default isUserVerifiedEmail;
