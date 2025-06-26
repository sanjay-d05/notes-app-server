import { generateToken } from '../config/utils.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const signup = async(req,res) => {
    try {
        const {name,email,password} = req.body ;

        if(!name || !email || !password) return res.status(400).json({success:false,message:'All Fields are Required'});

        const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailregex.test(email)) return res.status(400).json({success:false,message:'Invalid Email'});

        if(password.length < 6) return res.status(400).json({success:false,message:'Password must be 6 characters'}) ;

        const existingUser = await User.findOne({email}) ;

        if(existingUser) return res.status(400).json({success:false,message:'User already exists'});

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name , email , password : hashedPassword
        });

        return res.status(201).json({success:true,message:'Account Created Successfully',data:newUser});
        

    } catch (error) {
        console.log('Error from signup route' , error);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const login = async(req,res) => {
    try {
        const {email,password} = req.body;

        if(!email || !password) return res.status(400).json({success:false,message:'All Fields are required'});

        const user = await User.findOne({email});

        if(!user) return res.status(400).json({success:false,message:'Invalid Credentials'});

        const isPasswordMatch = await bcrypt.compare(password , user.password);

        if(!isPasswordMatch) return res.status(400).json({success:false,message:'Invalid credentials'}) ;

        generateToken(user._id ,  res);

        return res.status(200).json({success:true,message:'Logged In Successfully',data:user});

    } catch (error) {
        console.log('Error from login route' , error);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('notesAccessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log('Error in logout route', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


export const checkAuth = async(req,res) => {
    try {
        return res.status(200).json({success:true,message:'Token Provided',data:req.user});
    } catch (error) {
        console.log('Error from check auth route',errro);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};
