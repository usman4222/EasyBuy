import jwt from "jsonwebtoken";
import { ErrorHandler } from "./error.js"; 

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  console.log("This is the token:", token);

  if (!token) {
    return next(ErrorHandler(401, "Token not not found!")); 
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(ErrorHandler(401, "Unauthorized")); 
    }
    
    req.user = user; 
    next(); 
  });
};
