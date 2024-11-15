const express = require('express')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const router = new express.Router()

// register 
router.post('/register',userController.registerController)
// login 
router.post('/login',userController.loginController)
// allusers
router.get('/allusers',jwtMiddleware,userController.allusersController)
// singleuser
router.get('/singleuser',jwtMiddleware,userController.singleuserController)

module.exports=router