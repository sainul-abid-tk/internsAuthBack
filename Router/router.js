const express=require('express')
const router=express.Router()
const userController=require('../Controllers/userController')
// sign
router.post('/signup',userController.userSignup)
// login
router.post('/login',userController.userLogin)

module.exports=router