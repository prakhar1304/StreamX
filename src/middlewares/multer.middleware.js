import multer
 from "multer";
 import path from "path";
 import fs from "fs";
//cb is  callback

// Define the upload directory
const uploadPath = path.join('D:', 'public', 'temp');  // Absolute path: D:/public/temp

// Check if the directory exists; if not, create it
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });  // Create the directory and any necessary parent directories
}


 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath)
      //error  wehn i  was  writting in   single  quote
    },
    filename: function (req, file, cb) {
      console.log(file.originalname);
      cb(null, file.originalname)
    }
  })
  
  export const  upload = multer({  storage })