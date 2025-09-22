const { user, generateToken } = require("../utils/auth")
const { NotFoundError } = require("../utils/error")

const loginGet=(req,res)=>{
  res.render('login2')
}

const loginPost=(req,res,next)=>{
  try{
  const {username,password}=req.body
  const student=user.find(u=>u.username===username && u.password===password)
  if(student){
    console.log(student)
    res.cookie('Hiba',generateToken(student),{httpOnly:true,maxAge:3600000})
    res.status(200).render('profile2',{
      username:student.username,
      age:student.age,
      role:student.role,
      id:student.id
    })
  }else{
    return next(new NotFoundError('Invalid Username Or Password'))
  }
}catch(err){
   next(err)
}
}

const profile2=(req,res)=>{
  res.render('profile2')
}

const adminGet = (req, res) => {
  res.render('adminPage');
}

module.exports = { adminGet,loginGet,loginPost,profile2}
