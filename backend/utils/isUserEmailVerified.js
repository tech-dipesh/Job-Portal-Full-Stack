import connect from "../db.js"
async function isUserVerifiedEmail(uid){
    const {rows: checkIs}=await connect.query("select is_verified from email_verified where user_id=$1", [uid]);
    const {is_verified: isUserVerified}=checkIs[0];
    return isUserVerified
}
export default isUserVerifiedEmail;