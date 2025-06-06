const signupModel = require('../models/signupModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.createLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const login = await signupModel.findOne({ email: email })
        if (login) {
            const isMatch = await bcrypt.compare(password, login.password)
            if (isMatch) {
                const token = jwt.sign({
                    data:login.email
                }, "abcd",{expiresIn: "1d"})
                res.json({
                    success: true,
                    token                                                                                
                })
            }
            else {
                res.status(401).json({
                    success: false,
                    message: "Invalid Password"
                })
            }
        }
        else{
            res.status(401).json({
            success: false,
            message: "User not exist"
        })
        }
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }

} 