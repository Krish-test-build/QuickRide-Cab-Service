const mongoose=require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema =new mongoose.Schema({
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
            lowercase:true
        },
        password:{
            type:String,
            required:true,
            select:false

        },
        socketID:{
            type:String
        },
    

})

userSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({id:this._id},process.env.JWT_SECRET)
    return token
}

userSchema.methods.comparePassword= async function (password) {
    return await bcrypt.compare(password,this.password)
    
}
userSchema.statics.hashPassword= async function(password){
    return bcrypt.hash(password,10)
}

const userModel= mongoose.model('user',userSchema)

module.exports=userModel;