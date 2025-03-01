import {Router} from "express";
import {resigertuser} from  '../controller/user.controller.js'

const router =  Router()

router.route("/register").post(resigertuser)

export default router