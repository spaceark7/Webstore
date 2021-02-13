import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'





const tokenGenerator = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn : "10d",

    })

   
}

export default tokenGenerator