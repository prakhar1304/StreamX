import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiRes.js';
import path from "path"
import cookieParser from 'cookie-parser';



const refereshTokenAccesToken = async (userId) => {
 try {
  const user =  await User.findById(userId);
  const refreshToken = user.rgenrateRefreshToken();
  const accessToken = user.genrateAccesToken();

  user.refreshToken =  refreshToken;
  //how  is  this  possible 
  user.save({ validateBeforeSave: false });

  return {accessToken , refreshToken }
  
 } catch (error) {
  throw new  ApiError(500 ,"issue  from our  side  while geting  acess token and refresh token")
 }
}
  //get user details from frontend
  //validation - not  empty
  //check if user already exist (email)
  //check for images avtar
  //upload them to clodinary
  //create user object -->  mongo  db  create entry in db
  //remove password and refresh token field from res
  //check for user creation
  //return res
  //----------------------------
  //url
  // Form   json  -->  req.boy

const resigertuser = asyncHandler(async (req, res) => 
{

  const { fullname, email, username, password } = req.body;
  console.log('email:', email);

  if (
    [fullname, email, username, password].some((field) => field?.trim === '')
  ) {
    throw new ApiError(400, 'empty field');
  }

  // User.findOne({username})
  //check  both the cases
  //query  mongo db
  //$or  -  this is the   operator   thake  array    of  seprate obj
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    console.log(existingUser._id);
    throw new ApiError(409, 'User with email or username already  exists');
  }

  // const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  const avtarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  console.log(req.files);
  //check if   file  existe  then  only 
  let coverImageLocalPath ;
  if(req.files && (req.files?.coverImage) && req.files?.coverImage[0] && req.files?.coverImage[0]?.path){
    coverImageLocalPath = req.files?.coverImage[0]?.path;
  }

  if (!avtarLocalPath) {
    ApiError(404, 'Avatar is empty');
  }

  const avatar = await uploadOnCloudinary(avtarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(409, 'avatar is   required');
  }

  const user = await User.create({
    fullname,
    email,
    username,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
  });

  // console.log()
  const CreatedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!CreatedUser) {
    throw new ApiError(
      500,
      'something  went  wrong  while  registring the user'
    );
  }

  
return res.status(201).json(new ApiResponse(200, CreatedUser, 'o'));
});



const  loginUser =  asyncHandler ( async (req , res) => {

  //req body 
  // username or  email 
  //find the user 
  //  password check 
  //access and  refresh  token 
  //send  cokie

  const {email , username , password} = req.body;

if(!email || !username){
  throw new   ApiError(400, "Enter  either  username or email")
}


  const  user = await User.findOne({
    $or: [{email} , {username}]
  })

  if(!user){
    throw new ApiError(400 , "No  user  found with this email or username")
  }

  const isPasswordCorrect = await user.checkPassword(password);

  if(!isPasswordCorrect){
    throw new ApiError(401 , "invalid user creditionals")
  }

 const {accessToken , refreshToken} =  refereshTokenAccesToken(user._id);

 const loggeduser = await user.findById(user._id).select("-password -refreshToken")

 //how  to  passss to  cokkies 
 //this  option   add  option  so that  u  can   change   cookies  from server only 
//modofy  only  by  server
 const options = {
  httpOnly: true,
  secure : true
 }

 res.status(200)
 .cookie("accessToken" , accessToken , options)
 .cookie("refreshToken" , refreshToken , options)
 .json
 (
    new ApiResponse (200 , {user:  loggeduser , accessToken , refreshToken} , "user logged in  succesfully")
 )


 const logOutuser = asyncHandler (async (req , res ) => 
 {
  //how  to   get user 

  await User.findByIdAndUpdate(req.user._id,{

    $set: {
      refreshToken: undefined
    },
    {new : true}//this  line  help  to  return  the  updated   data
  });
 
  const options = {
    httpOnly: true,
    secure : true
   }

  return req.status(200).clearCookies(accessToken, option).clearCookies(refreshToken , option).json(
    new ApiRes(200 , {} , "User LOGOUT")
  )

 })

})

export { resigertuser  , loginUser  , logOutuser};
