const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
console.log("inside middleware");
const token = req.headers["authorization"].split(" ")[1]
console.log(token);
if (token) {
    try {
        const jwtresponse = jwt.verify(token,process.env.JWTPASSWORD)
        console.log(jwtresponse);
        next()
    } catch (error) {
        res.status(401).json("please login")
    }
} else {
    res.status(404).json("token missing")

}

}

module.exports=jwtMiddleware