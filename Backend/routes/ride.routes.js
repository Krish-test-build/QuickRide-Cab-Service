const router = require('express').Router()
const {body,query}=require('express-validator')
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString({min:3}).withMessage('Invalid pickup Location'),
    body('destination').isString({min:1}).withMessage('Invalid Destination '),
    body('vehicleType').isIn(['auto', 'bike', 'car']).withMessage('Invalid Vehicle Type'),
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString({min:3}).withMessage('Invalid pickup Location'),
    query('destination').isString({min:1}).withMessage('Invalid Destination '),
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid Ride ID'),
    rideController.confirmRide
)
router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid Ride Id'),
    query('otp').isString().isLength({min:6,max:6}).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid Ride Id'),
    rideController.endRide
)

module.exports=router