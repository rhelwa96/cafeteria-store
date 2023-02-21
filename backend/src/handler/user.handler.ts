import {Request, Response} from 'express'
import User_Model from '../models/user.models'
import jwt from 'jsonwebtoken'
import config from '../config'
// import axios from 'axios'
 
const user_Model=new User_Model()   
 
export const authenticate= async(req:Request,res:Response,) => {
    // if(!req.body.gtoken){
    //     return res.json({error: "Captcha Token is missing"})
    // }
    try {
        // const googleVerifyUrl =`https://www.google.com/recaptcha/api/siteverify?secret=${config.captcha_secret_key as unknown as string}&response=${req.body.gtoken as string}`
        // const gcaptcha_response= await axios.post(googleVerifyUrl,
        //     {},
        //     {
        //       headers: {
        //         "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        //       }
              
        //     },)
              
        // const {success}=gcaptcha_response.data
        // if(success)
        // {
            const u = await user_Model.authenticateUser(req.body.email,req.body.password_digest)
            if(!u){return res.json({status:"Email/password incorrect"})}
            return res.status(200).send({"token":jwt.sign(u,config.token as unknown as string)})
        // } 
        // else {
        //    return res.json({status:"Captcha Failed: Refresh page then Try again"})
        // }
    } catch(err){
        return res.status(400).json(err)
    }
}
export const forgetPassword= async(req:Request,res:Response,) => {
   /* if(!req.body.gtoken){
        return res.json({error: "Captcha Token is missing"})
    }*/
    try {
      /*  const googleVerifyUrl =`https://www.google.com/recaptcha/api/siteverify?secret=${config.captcha_secret_key as unknown as string}&response=${req.body.gtoken as string}`
        const gcaptcha_response= await axios.post(googleVerifyUrl)
        const {success}=gcaptcha_response.data
        if(success)
        {*/
            const user=await user_Model.findOne(req.body.email as unknown as string)
            if(!user){
                return res.json({status:"Email doesnt exist, please check with IT department"})
            }
    
            const token= jwt.sign(user, config.token as unknown as string, {
                expiresIn:"45m"
            })
            const link=(`http://localhost:3000/${token}`)
     
              return res.status(200).json({status:link})
        // } else {
        //    return res.json({status:"Captcha Failed: Refresh page then Try again"})
        // }

    } catch(err){
        return res.status(400).json(err)
    }
}
export const resetPassword= async(req:Request,res:Response,) => {
        const {id,token}=req.params;
        // console.log(req.params)
      //  res.status(200).send("Done")
        const u = await user_Model.RetrieveSingle(id)
        if(!u){return res.json({status:"User does not exist"})}
        // res.status(200).send({"token":jwt.sign(u,config.token as unknown as string)}) 
    try {    
        const verify=jwt.verify(token,config.token as unknown as string)
        return res.send("Verified")
    } catch(err){
        return res.send("Not Verified")
    }

}
export const create= async( req:Request,  res:Response,) => {
    try {
        const user=await user_Model.create(req.body)
        return res.status(200).json(user)
    } catch(err){
        return res.status(400).json(err)
    }
}      
export const deleteSingle= async(req:Request,res:Response,) => {
    try {
        const user=await user_Model.deleteSingle(req.params.id as string)
        return res.status(200).json(user)
    } catch(err){
        return res.status(400).json(err)
    }
}
export const RetrieveAll= async(_:Request,res:Response) => {
    try {
        const user=await user_Model.RetrieveAll()
        return res.status(200).json(user)
    } catch(err){
        return res.status(400).json(err)
    }
}
export const RetrieveMultipleBalance= async(req:Request,res:Response) => {
    try {
        const user=await user_Model.RetrieveMutipleBalance(req.params.datefrom as unknown as string,req.params.dateto as unknown as string)
        return res.status(200).json(user)
    } catch(err){
        return res.status(400).json(err)
    }
}
export const RetrieveSingle= async(req:Request,res:Response) => {
    try {
        const user=await user_Model.RetrieveSingle(req.params.id as unknown as string)
        return res.status(200).json(user)
    } catch(err){
        return res.status(400).json(err)
    }
}
export const balance= async(req:Request,res:Response) => {
    try {
        const user=await user_Model.RetrieveBalance(req.params.id as unknown as string)
        return res.status(200).json(user)
    } catch(err){
        return res.status(400).json(err)
    }
}
export const updateSingle= async(req:Request,res:Response) => {
    try {
        const user=await user_Model.updateSingle(req.body)
        return res.status(200).json(user)
    } catch(err){
        return res.status(400).json(err)
    }
}