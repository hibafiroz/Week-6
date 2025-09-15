const jwt = require('jsonwebtoken')
const dotenv=require('dotenv').config()
const secretKey=process.env.secretKey
const user=[{
    id:123,
    username:'Hiba firoz',
    age:'22',
    course:'BSc Computer Science',
    password:'1',
    role:'student'
}]
options={expiresIn:'1h'}
const payload={username:user[0].username,role:user[0].role}

const tokenFunction=()=>{
   return jwt.sign(payload,secretKey,options)
}
const authMiddleware=(req,res,next)=>{
    const token=req.cookies?.Hiba
    if(!token){
        res.status(403).send('Login first')
    }else{
        try{
        const decoded=jwt.verify(token,secretKey)
        req.user=decoded
        next()
    }catch(err){
    res.status(403).send('Invalid Token')
}
    }
}

module.exports={tokenFunction,user,authMiddleware}
