const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    description:String
})

const ticketModel = mongoose.model("Ticket", ticketSchema)
module.exports= ticketModel