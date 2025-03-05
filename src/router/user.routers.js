import {Router} from "express";
import {resigertuser} from  '../controller/user.controller.js'
import {upload} from "../middlewares/multer.middleware.js"
import {loginUser}  from  '../controller/user.controller.js'
import verifyUser from "../middleware/auth.middleware.js"

const  router =  Router()
//adding  middleware -->  jate  hua  mujhhe  milka  jan 
router.route("/register").post( 
    upload.fields([
        {
            name : "avatar",
            maxCount:1
        },
        {
            name : "coverImage",
            maxCount:1
        }
    ]),
    resigertuser
)

router.route("/login").post(loginUser)
router.route("/logout").post(verifyUser,)

export default router