const mongoose=require('mongoose')


const rideSchema=new mongoose.Schema({

    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'user' 
    },
    captain: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain', 
        },
    pickup: {
        type: String,
        required: true 
    },
    destination: {
        type: String, 
        required: true 
    },
    fare: { 
        type: Number, 
        required: true 
    },
    status: {
        type: String,
        enum: ['pending', 'accepted','ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration:{
        type:Number,
    },
    distance:{
        type:Number,
    },
    otp:{
        type:String,
        select: false,
         
    },
    socketID: 
    { type: String, 
        default: null
    }


})

module.exports=mongoose.model('rideModel',rideSchema)