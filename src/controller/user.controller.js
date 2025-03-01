import {asyncHandler} from "../utils/asyncHandler.js"
const resigertuser =  asyncHandler( async (req ,res)   => {
            res.status(200).json({
                message:"ok"
            })
    })


export {resigertuser}