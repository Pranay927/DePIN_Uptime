import type { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res:Response, next:NextFunction)=>{
    const {authorization} = req.headers;
    req.userId = "1";
    next();
}