const express = require('express')
const app = express();
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path: path.join(__dirname, 'config', 'config.env')})
const cors = require('cors');
const { route } = require('./routes/ticket');
const connectDatabase = require('./config/connectDatabase');
connectDatabase();
app.use(cors())
app.use(express.json())
const ticket = require('./routes/ticket');


app.use('/api/v1',ticket)



app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port ${process.env.PORT} in  ${process.env.NODE_ENV} environment`)
})
