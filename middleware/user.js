const { User } = require("../db");
const jwt = require("jsonwebtoken");
const jwtconfig = require("../config/jwtconfig");


// Middleware for handling auth
function userMiddleware(req, res, next) {
    if(req.headers.authorization){
        const jwtToken = req.headers.authorization;
        try{
            const decodedValue = jwt.verify(jwtToken, jwtconfig);
            if (decodedValue) {
                req.headers.email = decodedValue;
                next();
            } else {
                res.status(403).json({ 
                    msg: "You are not authenticated"
                })
            }
        }catch(e){
            res.json(e)
        } 
    }else{
        const email = req.headers.email;
        const password = req.headers.password;
        const token = jwt.sign(email, jwtconfig);
        res.json(token)
        next();
    }
}
module.exports = userMiddleware;