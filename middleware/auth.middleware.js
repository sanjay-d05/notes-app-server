import User from "../models/user.js";
import jwt from 'jsonwebtoken';

export const isAuthenticated = async(req,res,next) => {
    try {
        const token = req.cookies.notesAccessToken;

        if(!token) return res.status(401).json({success:false,message:'Unauthorized - No Token Provided'});

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded) return res.status(401).json({success:false,message:'Unauthorized - Invalid Token'});

        const user = await User.findById(decoded.userId).select("-password");

        req.user = user ;

        next() ;
        
    } catch (error) {
        console.log('Error in authentication route',error);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};