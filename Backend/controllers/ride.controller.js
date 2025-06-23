const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');
const userModel = require('../models/user.model')

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const user = await userModel.findById(req.user._id); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const ride = await rideService.createRide({
      userId: user._id,
      pickup,
      destination,
      vehicleType,
      socketID: user.socketID, 
    });

    await ride.save();

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    const captains = await mapService.getCaptainsInTheArea(
      pickupCoordinates.lat,
      pickupCoordinates.lon,
      6000
    );

    const RideData = await rideModel.findById(ride._id).populate('user');

    await Promise.all(
      captains.map(async (captain) => {
        sendMessageToSocketId(captain.socketID, {
          event: 'new-ride-request',
          data: RideData,
        });
      })
    );

    return res.status(201).json(RideData);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};



module.exports.getFare = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fares = await rideService.getFare(pickup, destination);
        res.status(200).json(fares);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;
  const captainId = req.captain._id;

  try {
    const ride = await rideService.confirmRide(rideId, captainId);

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found or already confirmed' });
    }

    console.log("📨 Emitting to socket:", ride.user.socketID);
    sendMessageToSocketId(ride.user.socketID, {
      event: 'ride-confirmed',
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}


module.exports.startRide = async (req,res) => {
  const { rideId, otp } = req.query;

try {
  const ride = await rideService.startRide({
    rideId,
    otp,
    captain: req.captain
  });

  sendMessageToSocketId(ride.user.socketId, {
    event: 'ride-started',
    data: ride
  });

  return res.status(200).json(ride);
} catch (err) {
  return res.status(500).json({ message: err.message });
}

}

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.endRide({ rideId, captain: req.captain }); 

    sendMessageToSocketId(ride.user.socketID, {   
      event: 'ride-ended',
      data: ride
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
