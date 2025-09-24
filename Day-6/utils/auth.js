const jwt=require('jsonwebtoken')
const { NotFoundError } = require('./error')
const dotenv=require('dotenv').config()
const secretKey=process.env.secretKey
const user=[{
    id:123,
    username:'Hiba firoz',
    age:'22',
    course:'BSc Computer Science',
    password:'123456',
    role:'student'
},{
    id:456,
    username:'Meharin',
    age:'22',
    course:'MEAN Stack',
    password:'123456',
    role:'student'
},{
    id:234,
    username:'Marseena',
    age:'30',
    course:'MERN Stack',
    password:'123456',
    role:'student'
},{
    id:678,
    username:'Shahanas',
    age:'30',
    course:'Bachelor of Dental Surgery',
    password:'123456',
    role:'student',
},{
    id:101,
    username:'Eeman',
    age:'30',
    password:'123456',
    role:'admin',
},{
    id:102,
    username:'Gopika',
    age:'30',
    password:'123456',
    role:'admin',
},{
    id:103,
    username:'Musfira',
    age:'30',
    password:'123456',
    role:'admin',
}]

function generateToken(student){
    const options={ expiresIn: '1h' };
    const payload={ id: student.id, username: student.username, role: student.role };
    return jwt.sign(payload, secretKey, options);
}

const authMiddleware=(req,res,next)=>{
     try{
    const token=req.cookies?.Hiba
    if(!token){
        return next(new NotFoundError('Login first'));
    }else{
        const decoded=jwt.verify(token,secretKey)
        req.user=decoded //storing logged in user details from token into the request so later routes can access it
        next()
    }
     } catch(err){
    next(err)
}
}
module.exports={generateToken,user,authMiddleware}
