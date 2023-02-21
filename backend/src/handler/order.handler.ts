import {Request, Response} from 'express'
import Order_Model from '../models/order.models'
const order_Model=new Order_Model()

export const create= async(req:Request,res:Response) => {
try {
    const order=await order_Model.create(req.body)
    return res.status(200).json(order)
    } catch(err){
    return res.status(400).json(err)
    }
}

export const createMultiple= async(req:Request,res:Response) => {
    try {
        const order=await order_Model.createMultiple(req.body)
        return res.status(200).json(order)
        } catch(err){
            return res.status(400).json(err)
        }
    }
    

export const deleteSingle= async(req:Request,res:Response) => {
    try {
    const order=await order_Model.deleteSingle(req.params.id as string)
    return res.status(200).json(order)
    } catch(err){
        return res.status(400).json(err)
    }
}

export const RetrieveAll= async(_req:Request,res:Response) => {
    try {
    const order=await order_Model.RetrieveAll()
    return res.status(200)  
    .json(order)
    } catch(err){
        return res.status(400).json(err)
    }
}
export const RetrieveAllInactive= async(_req:Request,res:Response) => {
    try {
    const order=await order_Model.RetrieveAllInactive()
    return res.status(200)  
    .json(order)
    } catch(err){
        return res.status(400).json(err)
    }
}
export const RetrieveSingle= async(req:Request,res:Response) => {
try {
    const order=await order_Model.RetrieveSingle(req.params.id as unknown as string)
    return res.status(200).json(order)
    } catch(err){
        return res.status(400).json(err)
    }
}
export const RetrieveUserHistory= async(req:Request,res:Response) => {
    try {
        const order=await order_Model.RetrieveUserHistory(req.params.id as unknown as string)    
        return  res.status(200).json(order)
        } catch(err){
            res.status(400).json(err)
        }
    }
export const updateSingle= async(req:Request,res:Response
) => {
try {
    const order=await order_Model.updateSingle(req.body)
    return res.status(200).json(order)
    } catch(err){
        return res.status(400).json(err)
    }
}
export const updateStatus= async(req:Request,res:Response
    ) => {
    try {
        const order=await order_Model.updateStatus(req.params.id as unknown as string)
        return res.status(200).json(order)
        } catch(err){
            return res.status(400).json(err)
        }
    }
    