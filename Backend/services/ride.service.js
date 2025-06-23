const axios = require('axios');
const rideModel = require('../models/ride.model');
const mapsService = require('../services/maps.service');
const crypto = require('crypto');
const {sendMessageToSocketId} = require('../socket');
async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error('Origin and Destination are both required');
  }

  const distanceTime = await mapsService.getDistanceTime(pickup, destination);
  if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
    throw new Error('Unable to calculate distance and time');
  }

  const baseFares = { auto: 30, bike: 17, car: 45 };
  const perKmRates = { auto: 10, bike: 8, car: 15 };
  const perMinRates = { auto: 2, bike: 1, car: 3 };

  const distanceInKm = distanceTime.distance;
  const durationInMin = distanceTime.duration;

  const fares = {};
  for (const type of Object.keys(baseFares)) {
    fares[type] = Math.round(
      (baseFares[type] +
        perKmRates[type] * distanceInKm +
        perMinRates[type] * durationInMin) * 100
    ) / 100;
  }

  return fares;
}
module.exports.getFare = getFare;

function getOtp(num) {
  if (!Number.isInteger(num) || num <= 0) {
    throw new Error('Number of digits must be a positive integer');
  }
  const max = 10 ** num;
  return crypto.randomInt(0, max).toString().padStart(num, '0');
}

module.exports.createRide = async ({
  userId,
  pickup,
  destination,
  vehicleType,
  socketID
}) => {
  if (!pickup || !destination || !vehicleType) {
    throw new Error('All fields are required');
  }

  const fare = await getFare(pickup, destination);

  return await rideModel.create({
    user: userId,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
    socketID
  });
};

module.exports.confirmRide = async (rideId, captainId) => {
  if (!rideId || !captainId) {
    throw new Error('Ride ID and Captain ID are required');
  }

  const ride = await rideModel.findById(rideId).populate('user').select('+otp');
  if (!ride) {
    throw new Error('Ride not found');
  }

  if (ride.captain) {
    throw new Error('Ride already confirmed by another captain');
  }

  ride.captain = captainId;
  ride.status = 'accepted';
  await ride.save();

  const populatedRide = await rideModel
    .findById(ride._id)
    .populate('user')
    .populate({
      path: 'captain',
      select: 'fullName vehicle email socketID'
    })
    .select('+otp');

  return populatedRide;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
  console.log(rideId, otp, captain);
  if (!rideId || !otp) {
    throw new Error('Ride ID and OTP are required');
  }

  const ride = await rideModel.findOne({ _id: rideId })
    .populate('user')
    .populate({
      path: 'captain',
      select: 'fullName vehicle email socketID'
    })
    .select('+otp');

  if (!ride) {
    throw new Error('Ride not found');
  }

  if (ride.status !== 'accepted') {
    throw new Error('Ride not accepted');
  }

  if (ride.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status: 'ongoing' }
  );

  sendMessageToSocketId(ride.user.socketID, { 
    event: 'ride-started',
    data: ride
  });

  return ride;
}; 
module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate({
        path: 'captain',
        select: 'fullName vehicle email socketID' // Optional: Keep consistent with previous queries
    }).select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    const updatedRide = await rideModel.findByIdAndUpdate(
        rideId,
        { status: 'completed' },
        { new: true } 
    ).populate('user').populate({
        path: 'captain',
        select: 'fullName vehicle email socketID'
    }).select('+otp');

    return updatedRide;
};
