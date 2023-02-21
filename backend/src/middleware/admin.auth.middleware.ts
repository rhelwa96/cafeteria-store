import { Request,Response, NextFunction } from "express"
import jwt, { Secret } from 'jsonwebtoken'
import config from '../config'
const Validate = (req: Request,  res:Response, next:NextFunction): void | boolean => {
    const auth_Header=req.headers.authorization
    if (!auth_Header) {
        res.status(401)
        res.json("Not authenticated, Invalid token!")
        return false
      }
      const tk=auth_Header.split(' ')[1]
    try {
       jwt.verify(tk,(config.token as Secret))
       next()
    }
    catch (error) {
            res.status(401)
            res.json("Invalid token !")
        }
    }

    export default Validate