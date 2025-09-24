const { user, generateToken } = require("../utils/auth")
const { NotFoundError } = require("../utils/error")
const loginGet=(req,res)=>{
    res.render('login')
}

const loginPost=(req,res,next)=>{
    try{
     const {username,password}=req.body
     const student=user.find(u=>u.username===username && u.password===password)  //find will automatically give all other details of that person
    if(student){
        res.cookie('Hiba',generateToken(student),{httpOnly:true,maxAge:3600000})
        res.status(200).render('profile',{
            username:student.username,
            age:student.age,
            role:student.role,
            id:student.id,
            course:student.course
        })
    }else{
        return next(new NotFoundError('Invalid username or password'))}
    }catch(err){
    next(err)
}
}

const profile=(req,res)=>{
    res.render('profile')
}

module.exports={loginGet,loginPost,profile}


