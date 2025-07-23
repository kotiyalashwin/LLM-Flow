import { NextFunction , Request , Response } from "express"

const limitStore: Record<string , {time : string}> = {}

export const ratelimiter = async(req:Request , res:Response , next:NextFunction)=>{
    const {id} = req.params;
    const now = new Date().toLocaleDateString()
    if(limitStore[id]){
        if(limitStore[id].time === now){
            res.status(403).json({error : 'Try Tomorrow'})
            return
        }else{
            limitStore[id].time = now
        }
    }
    limitStore[id] = {time : now}
    next()
}