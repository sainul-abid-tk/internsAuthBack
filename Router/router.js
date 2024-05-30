const express=require('express')
const router=express.Router()
// Role based middleware..
const roleBasedMiddleware=require('../Middlewares/roleBasedJwt')
const userController=require('../Controllers/userController')
const adminController=require('../Controllers/adminController')

// signUp
router.post('/signup',userController.userSignup)
// login
router.post('/login',userController.userLogin)
// google Login
router.post('/googleLogin',userController.googleLogin)
// dummyAPI
router.get('/userdummy',roleBasedMiddleware('user'),userController.dummyAPI)

// ADMIN

// dummyAPI
router.get('/admindummy',roleBasedMiddleware('admin'),adminController.dummyAPI)
module.exports=router