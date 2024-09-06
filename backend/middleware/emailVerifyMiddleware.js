import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler'

const emailVerifyProtect = asyncHandler(async(req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({email});

    if(user){
        if(user.emailVerify === 1){
            next();
        }else{
            res.status(401);
            throw new Error("Not email verified");
        }
    }else{
        res.status(401);
        throw new Error("Not Registered");
    }

});

export {emailVerifyProtect};