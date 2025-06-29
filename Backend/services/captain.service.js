const captainModel=require('../models/captain.model')

module.exports.createCaptain=async({
    fullName: { firstName, lastName },
    email,
    password,
    vehicle: { color, plate, capacity, vehicleType }
})=>{
    if(!firstName||!lastName||!email||!password||!color||!plate||!capacity||!vehicleType){
        throw new Error("All Fields are required")
    }
    const captain=captainModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password,
        vehicle:{color,plate,capacity,vehicleType}
        
    })
    
    return captain
}