const express = require('express');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const mongoose=require('mongoose')

const userRoute = require('./routes/userRoute');

mongoose.connect(`${process.env.MONGODB_URL}`).then(()=>{
    console.log(
    "connected succesffully"
  )}).catch((err)=>{
  console.log(err.message)
  })
  const app = express();
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  
  app.use(cors({
    origin:"*",
    credentials: true
  }));
  app.get('/', (req, res) => {
    res.send('API is working');
  });
  app.use('/api/user', userRoute);

  app.listen(4002,()=>{
    console.log("listening at 4002")
  })