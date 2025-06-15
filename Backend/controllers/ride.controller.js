const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;
    
    try {
        
        const ride = await rideService.createRide({
            userId: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        res.status(201).json(ride);
    } catch (err) {
        res.status(500).json({ message: err.message });
        
    }
}
