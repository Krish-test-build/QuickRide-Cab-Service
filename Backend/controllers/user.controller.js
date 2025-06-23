const blacklistTokenModel=require('../models/blacklistToken.model')
const userModel=require('../models/user.model')
const userService=require('../services/user.service')
const {validationResult}=require('express-validator')


module.exports.registerUser =async (req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const{fullName,email,password}=req.body

    const isUserAlreadyExists=await userModel.findOne({email})
    if(isUserAlreadyExists){
        return res.status(400).json({message:'User Already Exists'})
    }
    
    const hashedPassword=await userModel.hashPassword(password)

    const user=await userService.createUser({
        fullName:{
            firstName:fullName.firstName,
            lastName:fullName.lastName
        },
            email,
            password:hashedPassword,
            socketID:null 
        })

    const token =await user.generateAuthToken();

    res.status(201).json({token,user})
}   

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  const token = await user.generateAuthToken();
  res.cookie('token', token);

  const safeUser = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName
  };

  return res.status(200).json({ token, user: safeUser });
};


module.exports.getUserProfile= async(req,res,next)=>{
    return res.status(200).json(req.user)
}
module.exports.logoutUser= async(req,res,next)=>{
    res.clearCookie('token')
    const token =req.cookies.token|| (req.headers.authorization.split(' ')[1])
    await blacklistTokenModel.create({token})
    
    res.status(200).json({message:"Logged out"})

}