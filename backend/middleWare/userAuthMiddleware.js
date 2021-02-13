import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'


const Protect = asyncHandler(async(req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            res.status(401)
            throw new Error("Unauthorized! Bad Token")
        }
    }

    if(!token) {
        res.status(401)
        throw new Error("Bad Token! or Token Not Found")
    }

  
})


export default Protect