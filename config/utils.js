import jwt from 'jsonwebtoken';

export const generateToken = async(userId ,  res) => {
    const token = jwt.sign({userId} , process.env.JWT_SECRET , {expiresIn:'1d'});

    res.cookie('notesAccessToken' , token , {
        maxAge:1*24*60*60*1000,
        httpOnly:true,
        sameSite:"none",
        secure:true
    }) ;

    return token;
};
