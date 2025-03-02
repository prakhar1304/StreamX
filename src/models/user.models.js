import mongoose, { Schema, Types } from "mongoose";
//mongoo  auto matically  genrate  unique  id
import bcrypt from "bcrypt"

const  userSchema =  new Schema({

    username:{
        type: String,
        require: true,
        unique:true,
        index:true,//help for  searching in db (optimise)
        lowercase: true,
        trim: true,
    },
    email:{
        type: String,
        require: true,
        unique:true,
        lowercase: true,
        trim: true,
    },
    fullname:{
        type: String,
        require: true,
        lowercase: true,
        trim: true,
        index:true,
    },
    avatar:{
        type: String ,//cloudinary url,
        require:true,
    },
    coverImage:{
        type: String, 
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type: String,
        require: [true,"Password is required"]//we  can psas   custom  message  with  required field
    },
    refreshToken:{
        type:String
    }
    
},{timeseries:true})

userSchema.pre("save" , async function (next){


    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    //bcrypt  has  methode  hash  which   take  2  things  as imput  kisko  karna ha  or  kitna  round karna ha 
    next()//after  compt this  fun  will run

    //but  there is an  issue when  ever we  will  change  anything in  the  db  this  pre  will run so we  want when  password is  passed  then only  so 
    //if(!this.isModified("password")) return next();
})
//pre is methode which run on save other condition 
//imp
//we cant  use arrow fun  here bcox (this.) does not  work in  arrow  fun
//norml function (callback)
//pre is written just like app.use etc
//----------------
//time  taking process  so  use  async


userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.genrateAccesToken = function(){
    jwt.sign(
        {   //pass payload
            _id: this._id,
            username: this.username,

        },
        process.env.ACCES_TOKEN_SECRET,
        {
            expiresIn :  process.env.ACCES_TOKEN_EXPIRE,
        }
    )
}
userSchema.methods.genrateRefreshToken = function(){
    return jwt.sign(
        {   //pass payload in  refres  only id pass
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn :  process.env.REFRESH_TOKEN_EXPIRE,
        }
    )
}
export const User = mongoose.model("User",userSchema);


//notes-->

/*  bcrypt.js  and  bcrypt
--> using core bcrypt
-->  it  helps   use  to hash your  password

-----Token (jwt --> jason  web  token)-----
based on crypto  graphy


fancy name of  data -->  Payload

-----------how  to use -------------
dricetly not possible we use  hooks ( middleware) Pre
*/