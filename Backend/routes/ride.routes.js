const router = require('express').Router()
const {body}=require('express-validator')
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString({min:3}).withMessage('Invalid pickup Location'),
    body('destination').isString({min:3}).withMessage('Invalid Destination '),
    body('vehicleType').isIn(['auto', 'bike', 'car']).withMessage('Invalid Vehicle Type'),
    rideController.createRide
)



module.exports=router