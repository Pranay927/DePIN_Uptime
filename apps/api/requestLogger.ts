import type { Request, Response, NextFunction } from "express";
let reqNumber = 0
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    console.log("🔹 New Request Received 🔹", reqNumber+1);
    reqNumber++;
    
    console.log(`📌 Method: ${req.method}`);
    console.log(`📌 URL: ${req.originalUrl}`);
    console.log(`📌 Query Params:`, req.query);
    console.log(`📌 Headers:`, req.headers);
    
    if (req.method !== "GET") {
        console.log(`📌 Body:`, req.body);
    }
    
    console.log(`📌 IP Address: ${req.ip}`);
    console.log(`📌 Timestamp: ${new Date().toISOString()}`);
    console.log("--------------------------------------------------");

    next();  // Move to the next middleware
};
