const ticketModel = require("../model/ticketModel")
const bcrypt = require("bcryptjs")

exports.createTicket = async (req, res, next) => {
    const { name, email, password, description } = req.body;
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const ticket = await ticketModel.create({name,email,password:hashedPassword,description})
        res.json({
            success: true,
            message: "created"
        })
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message 
        })
    }

}

exports.getData = async(req, res, next) => {
    const ticketData = await ticketModel.find({});
    res.json({
        success: true,
        ticketData
    })
}

exports.deleteData = async(req, res, next) => {
    // const deleteData = await ticketModel.findByIdAndDelete(req.body._id)
    // console.log(req.body)
    const deleteData = await ticketModel.findOneAndDelete({_id: req.params.id})
    res.json({
        success: true
    })
}

exports.getsingleData = async(req,res,next) => {
    const getsingleData = await ticketModel.findOne({_id: req.params.id})

    res.json({
        success: true,
        getsingleData
    })
}

exports.updatesingleData = async(req,res,next) =>{
    const updatesingleData = await ticketModel.findOneAndUpdate({_id: req.params.id}, req.body)

    res.json({
        success:true,
        updatesingleData
    })
}
  