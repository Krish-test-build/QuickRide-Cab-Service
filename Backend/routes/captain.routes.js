const router=require('express').Router()
const {body}=require("express-validator")
const captainController=require('../controllers/captain.controller')
const authMiddleware=require("../middleware/auth.middleware")


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min:3}).withMessage('Your First Name must Be atleast 3 Characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 charcters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Colour must Be atleast 3 Characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate Number must Be atleast 3 Characters long'),
    body('vehicle.capacity').isLength({min:1}).withMessage('Your Capacity must Be atleast 1'),
    body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage('Invalid Selection')

], captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')

], captainController.loginCaptain
)

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)
router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain)



module.exports=router