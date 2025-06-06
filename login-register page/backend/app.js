const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
dotenv.config({path: path.join(__dirname, 'config', 'config.env')})

app.listen(process.env.PORT, () =>{
    console.log(`server is listening to port ${process.env.PORT} in ${process.env.NODE_ENV} process`)
})

const signup = require('./routes/signup')
const login = require('./routes/login');
const connectDatabase = require('./config/connectDatabase');

connectDatabase()
app.use(express.json());      
app.use(cors());
app.use('/api/v1/', signup);
app.use('/api/v1/', login); 
