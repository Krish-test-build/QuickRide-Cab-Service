const router=require('express').Router()
const {body}=require("express-validator")
const userController=require('../controllers/user.controller')


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min:3}).withMessage('Your First Name must Be atleast 3 Characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 charcters long')

], userController.registerUser
)


module.exports=router;