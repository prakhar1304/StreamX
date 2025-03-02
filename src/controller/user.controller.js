import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiRes.js';
import path from "path"


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
    throw new ApiError(409, 'User with email or username already  exists');
  }

  // const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  const avtarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

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


export { resigertuser };
