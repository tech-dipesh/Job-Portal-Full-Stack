const isOwnerMiddleware=async (req, res, next)=>{
  const {id}=req.params;
    const {uid}=req.user;
    if(id!=uid){
      return res.status(401).json({message: "You're not the owner of this Profile Picture"})
    }
    next()
}

export default isOwnerMiddleware;