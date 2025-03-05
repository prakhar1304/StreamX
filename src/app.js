import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";


const app =  express();
//app.use  is middleware by  app.use(cors()) cors is  confug but  for better use
app.use(cors({
    origin: process.env.CORS_ORIGN,
    credentials:true
}))

//multer  to  file transfer
//body-parse  for  previous 
app.use(express.json({limit: "16kb"}))
//for url 
//coz url  are  in differnt  way  and chnage  somme so  we  need to encode
app.use(express.urlencoded({extended:true , limit: "16kb"}))
//here  extended  keyword  is  used  which is  used to pass obj  ka  ander obj

app.use(express.static("public")) //remember we   create a  dir  public
//static is  used --> to store  the  file image   which  any one  can acces 

/*
----------
*/

//in user  browser  i  can  set and get cookies => basic  crud operation  (Create  read  update delete)

app.use(cookieParser())//yaha  pa  ya   lagan  ka  faida ya  hua  ki m acontroller  ma  cookie  use kar  parhahu

//router
import userRouter from "./router/user.routers.js"
//since  we are  using   route  in  different  folder  so  now  we  cant  use directly  we  need  to use middleware use  to  acees

app.use("/api/v1/user",userRouter )

export  {app}