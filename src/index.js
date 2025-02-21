
import connectDB from "./db/index.js";

import dotenv from "dotenv"
//dotenv.config(); // No need to specify path if your .env is in the root directory
dotenv.config({path: "./.env"});


//when  a  async  process is ende  it  return a promoise
connectDB()