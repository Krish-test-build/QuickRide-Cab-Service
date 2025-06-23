const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const captainSchema =new mongoose.Schema({
    fullName:{
        firstName:{
            required:true,
            type:String,
            minlength:[3,'First Name must be atleast 3 characters long'],
        },
        lastName:{
            required:true,
            type:String,
            minlength:[3,'First Name must be atleast 3 characters long'],
        }
    },
    email:{
            required:true,
            type:String,
            unique:true,
            trim:true,
            lowercase:true,
            match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]

        },
        password:{
            type:String,
            required:true,
            select:false

        },
        socketID:{
            type:String,
            default:null
        },
        Status:{
            type:String,
            enum:['active','inactive'],
            default:'inactive',
        },
        vehicle:{
            color:{
                type:String,
                required:true,
                minlength:[3,'Colour must be atleast 3 characters long']
            },
            plate:{
                type:String,
                required:true,
                minlength:[3,'Plate must be atleast 3 characters long']
            },
            capacity:{
                type:Number,
                required:true,
                minlength:[1,'Capacity must be atleast 1']
            },
            vehicleType:{
                type:String,
                required:true,
                enum:['car','bike','auto']
            }
        },
        location: {
            lat: {
                type: Number,
                default: 0,
            },
            long: {
                type: Number,
                default: 0,
            },
        },
        socketID:{
            type:String
        }

})


captainSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token    
}
captainSchema.methods.comparePassword= async function (password) {
    return await bcrypt.compare(password,this.password)
    
}
captainSchema.statics.hashPassword= async function(password){
    return bcrypt.hash(password,10)
}

const captainModel=mongoose.model('captain',captainSchema)
module.exports=captainModel