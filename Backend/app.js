const dotenv=require('dotenv').config
const express = require('express');
const cors = require('cors')
const app = express()
const connectToDb=require('./db/db')
const userRoutes =require('./routes/user.routes')
const captainRoutes=require('./routes/captain.routes')
const cookieParser=require('cookie-parser')


connectToDb()
app.use(cors({
    credentials: true,
    origin: true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.use('/users', userRoutes);
app.use('/captains', captainRoutes);


app.get('/',(req,res)=>{
    res.send("hello Worlds");
})

module.exports=app;