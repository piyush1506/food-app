const express  = require('express');
// const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const Otp = require('./routes/otp')
const http = require('http')
const {Server} = require('socket.io')
require('dotenv').config();
const cors = require("cors");
const app = express();

const server = http.createServer(app) 
 const mongoose = require('mongoose');
const  jwt = require('jsonwebtoken');
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


const io = new Server(server,{
    cors:{
        origin:"*",
        methods:['GET','POST']
    }
})

 io.on('connection',(socket)=>{
    const token = socket.handshake.auth?.token


    if (!token)return socket.disconnect()

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

    
    if(decoded.userType==='delivery'){
        socket.join('delivery-boys')
        socket.deliveryBoyId = decoded.id
         console.log('deliveryboy connected',socket.id)
    }else{
        socket.disconnect();
    }
}
catch (err) {
    console.log('invalid socket token')
  }
   
    socket.on('disconnect',()=>{
        console.log('delivery boy disconnected',socket.id)
    })
 })
 app.set('io',io)


const url = process.env.MONGO_URL



app.use('/api/v1/test',require('./routes/testroute'));
app.use('/api/v1/auth',require('./routes/authroutes'))
app.use('/api/v1/user',require('./routes/userroute'));
app.use('/api/v1/resturant',require('./routes/resturant'))
// app.use('/api/v1/rest',require('./routes/resturant'))

app.use('/api/v1/category',require('./routes/category'))
app.use('/api/otp',Otp)
//order deials

app.use('/api/v1/order',require('./routes/order'))

app.use('/api/v1/food',require('./routes/foodroutes'))

app.use('/api/v1/admin',require('./routes/adminroute'))

app.get('/',(req,res)=>{
    res.status(201).send('<h1>ram ram dosto</h1>');
})

app.use('/api/v1/dboy',require('./routes/deliveryboy'))



 try {
        // await mongoose.connect('mongodb+srv://ram:ram123@xchat.qfnk56h.mongodb.net/test');
        mongoose.connect(url)
        .then(()=>{
            
server.listen(8000,()=>{
    console.log('her her mahadev'.bgGreen);

})
            console.log(' ✅ db is conneted'.bgBlue)
        })
        
        .catch((error)=>{
            console.log('error is ',error);
        })
     
        
       
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
