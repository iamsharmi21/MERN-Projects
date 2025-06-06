const mongoose = require('mongoose')
console.log(process.env.DB_URL)
const connectDatabase = () => {mongoose.connect(process.env.DB_URL) .then((con) => {
    console.log("Mongodb connected to the host: "+con.connection.host);
}) 
}

module.exports= connectDatabase;
 