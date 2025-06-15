const axios=require('axios')
const rideModel=require('../models/ride.model')
const mapsService=require('../services/maps.service')
const crypto = require('crypto');



async function getFare(pickup,destination){
     if(!pickup||!destination){
        throw new Error('Origin and Destination are Both Required')
    }
    const distanceTime=await mapsService.getDistanceTime(pickup,destination)
    const baseFares = {
        auto: 30,
        bike: 17,
        car: 45
    };
    const perKmRates = {
        auto: 10,
        bike: 8,
        car: 15
    };
    const perMinRates = {
        auto: 2,
        bike: 1,
        car: 3
    };

    const distanceInKm = distanceTime.distance;
    const durationInMin = distanceTime.duration;
    console.log(distanceInKm, durationInMin);
    const fares = {};
    for (const type of Object.keys(baseFares)) {
        fares[type] =
            baseFares[type] +
            perKmRates[type] * distanceInKm +
            perMinRates[type] * durationInMin;
    }

    return fares;
}

function getOtp(num) {
    if (!Number.isInteger(num) || num <= 0) {
        throw new Error('Number of digits must be a positive integer');
    }
    const max = 10 ** num;
    const otp = crypto.randomInt(0, max).toString().padStart(num, '0');
    return otp;
}

module.exports.createRide=async ({
    userId,
    pickup,
    destination,
    vehicleType,
    
}) => {
    if (!userId || !pickup || !destination || !vehicleType) {
        throw new Error('All Fields are Required')
    }

    const fare=await getFare(pickup,destination)

    const ride=new rideModel({
        user:userId,
        pickup,
        destination,
        otp: getOtp(6),
        fare:fare[vehicleType],
    })

    return ride

}