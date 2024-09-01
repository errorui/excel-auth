const express = require('express');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose')

const userRoute = require('./routes/userRoute');
const fileRoute = require('./routes/fileRoute')
mongoose.connect(`${process.env.MONGODB_URL}`).then(() => {
  console.log(
    "connected succesffully"
  )
}).catch((err) => {
  console.log(err.message)
})
const app = express();

app.use(express.json({limit:'200mb'}));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '200mb', extended: true }));
console.log(process.env.FRONT)
app.use(cors({
  origin: process.env.FRONT,
  credentials: true
}));
app.get('/', (req, res) => {
  res.send('API is working');
});
app.use('/api/user', userRoute);
app.use('/api/file', fileRoute);
let port = process.env.PORT || 4002
app.listen(port, () => {
  console.log(`server running at ${port}`)
})