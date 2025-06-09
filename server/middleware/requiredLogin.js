import jwt from "jsonwebtoken"
 import UserModel from "../models/User.js";
export const reqLogin = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization)
         res.status(401).json({error: "Please log in"})
   const token = authorization.replace("Bearer ","");
     jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,payload)=>{
      if(err)
         res.status(401).json({error: "Unauthorized acess"})
        const {_id} = payload;
        const  newUser = await UserModel.findById(_id);
          req.name = newUser;
        next();

   })

} 