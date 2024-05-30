const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')
const {encrypt,decrypt}=require('n-krypta')
exports.userSignup=async(req,res)=>{
   const {username,email,password}=req.body
   const encryptPassword=encrypt(password,process.env.N_CRYPT_SECRET_KEY)
   try{
    const existingUser=await users.findOne({email})
    if(existingUser){
        res.status(406).json("User Already exist Please login!!")
    }else{
        const validateEmail = (email) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
          };
          if(validateEmail(email)){
           
            const newUser= users({
                username,email,password:encryptPassword,profilePic:""
            })
           await newUser.save()
           res.status(200).json(newUser)
          }else{
            res.status(406).json("This is not valid email!!")
          }
    }
   }catch(err){
     res.status(401).json(err)
   }
}

exports.userLogin=async(req,res)=>{
   const {email,password}=req.body
   const encryptPassword=encrypt(password,process.env.N_CRYPT_SECRET_KEY)
   try{
   const existingUser=await users.findOne({email,password:encryptPassword})
   if(existingUser){
     const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET_KEY)
     res.status(200).json({existingUser,token})
   }else{
    res.status(406).json('Please sign up!!! you dont have an account here!!')
   }
   }catch(err){
    res.status(401).json(err)
   }
}

exports.googleLogin=async(req,res)=>{
  const {email,username,profilePic}=req.body
  try{
    const sentUserData=(existingUser)=>{
      const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET_KEY)
      res.status(200).json({existingUser,token})
    }
    const existingUser=await users.findOne({email})
    if(existingUser){
      sentUserData(existingUser)
    }else{
      let newUser= users({
        username,email,password:"",profilePic
    })
   await newUser.save()
   sentUserData(newUser)
    }
  }catch(err){
    res.status(401).json(err)
  }
}

exports.dummyAPI=async(req,res)=>{
  try{
    res.status(200).json({userId:req.payload,message:'User accessed!!'})
  }catch(err){
    res.status(401).json(err)
  }
}
