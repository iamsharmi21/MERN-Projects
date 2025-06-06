const signupModel = require('../models/signupModel')
const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.createSignup =async (req,res,next) =>{
    const {name , email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const signup = await signupModel.create({name,email, password: hashedPassword})
    res.json({
        success : true,
        signup
    })
} 

exports.Getusers = async (req,res,next) => {
    const data = await signupModel.find({})

    res.json({
        success:true,
        data
    })
}

