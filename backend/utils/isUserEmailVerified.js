import connect from "../db.js";
async function isUserVerifiedEmail(uid) {
  try {
    const { rows } = await connect.query(
      "select is_verified from email_verified where user_id=$1 order by expired_at desc limit 1",
      [uid],
    );
    const { is_verified: isUserVerified } = rows[0];
    return isUserVerified;
  } catch (error) {
    console.log(error)
    return res.status(403).json({message: "User Have not been Verified Yet Please Verify First."})
  }
}
export default isUserVerifiedEmail;
