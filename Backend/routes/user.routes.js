const router=require('express').Router()
const {body}=require("express-validator")
const userController=require('../controllers/user.controller')
const authMiddleware=require('../middleware/auth.middleware.js')



router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min:3}).withMessage('Your First Name must Be atleast 3 Characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 charcters long')

], userController.registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 charcters long')

], userController.loginUser
)

router.get('/profile',authMiddleware.authUser,userController.getUserProfile)
router.get('/logout',authMiddleware.authUser,userController.logoutUser)


module.exports=router;