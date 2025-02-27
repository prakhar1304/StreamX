import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";

const app =  express();
//app.use  is middleware by  app.use(cors()) cors is  confug but  for better use
app.use(cors({
    origin: process.env.CORS_ORIGN,
    credentials:true
}))

//multer  fo r file transfer
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

app.use(cookieParser())

export default {app}