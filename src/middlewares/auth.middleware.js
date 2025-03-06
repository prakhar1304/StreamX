import { ApiError } from "../utils/ApiError.js"
import {User}  from "../models/user.models.js"
import jwt from "jsonwebtoken"
import {asyncHandler} from "../utils/asyncHandler.js"

 const verifyUser = asyncHandler(async (req ,  res , next) => {
  

    //1.token  lo 
    //2. token  ko verify  get  detail
    //3  use  that  detail 

   try {
     const  token = req.cookies?.accessToken || req.header["authorization"]?.replace("Bearer " , "")
 
     if(!token){
         throw new ApiError(400 , "User is not authorized, token missing");
     }
     //jwt have  the  information  when  we  made and   we have  to decode it to  extract
     const userJwt = jwt.verify(token , process.env.ACCES_TOKEN_SECRET)

     const userDetail = User.findById(userJwt._id)

     if(!userDetail){
        throw new ApiError(200, 'user is not  Authorized');
     }

    const user = userDetail.select("-password -refreshToken")

 

    req.user = user
    next()

   } catch (error) {
      console.log(error);
    throw new  ApiError(200 , "auth middleware error")
   }
})



export {verifyUser}