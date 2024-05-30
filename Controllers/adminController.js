
exports.dummyAPI=(req,res)=>{
  try{
    res.status(200).json({adminId:req.payload,message:'Admin accessed!!'})
  }catch(err){
    res.status(401).json(err)
  }
}