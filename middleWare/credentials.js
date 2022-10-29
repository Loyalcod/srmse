const AllowedOrigin = require("../config/allowedOrigin")


const credential = async(req,res,next)=>{

    const origin = req.headers.origin
    if(AllowedOrigin.includes(origin)){
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}

module.exports = credential