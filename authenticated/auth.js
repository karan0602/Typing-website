const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req , res , next)=>{
    
    try {
        const tmp = req.headers.cookie
        const token=tmp.substring(4)
        const verifyUser = jwt.verify(token , process.env.SECRET)
        // console.log("Hello Mr " + verifyUser)
        // console.log(verifyUser)

        const user = await User.findOne({_id:verifyUser._id})
        // console.log(user)

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        // res.status(501).send('Auth MiddleWare Fault ' + e)
        console.log("Authentication Error!")
        res.status(200).render('index')
    }
}

module.exports = auth 