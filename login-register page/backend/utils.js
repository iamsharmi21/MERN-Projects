const jwt = require('jsonwebtoken')

function verifyToken(token) {
    try {
        const decode = jwt.verify(token, 'abcd');
        return true       
    }
    catch (err) {
        console.log(err)
        return false 
    }
}                   
function authorize() {
    return async (req, res, next) => {
        const token = (req.headers.authorization || req.headers.Authorization || '').split('Bearer ').pop();
        if (!token) {
            res.json({
                success: false,
            })
        }
        try {                         
            const decodedData = await verifyToken(token) 
            if (decodedData) {
                return next()             
            }
            else {
                res.json({
                    success: false,
                    message: "Invalid Token"
                })
            }
        }
        catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    }
} 

module.exports= authorize