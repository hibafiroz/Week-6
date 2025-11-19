const express=require('express')
const bodyParser=require('body-parser')
const jwt=require('jsonwebtoken')
const cookie = require('cookie-parser')
const dotenv = require('dotenv').config()
const PORT=process.env.PORT
const secretKey=process.env.secretKey
const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookie())

const user={id:25,username:'hiba',password:'12345'}
const payload={id:user.id, name:user.username}

const tokenFunction=(user)=>{
  return jwt.sign(payload,secretKey,{expiresIn:'1h'})
}

function authMiddleware(req,res,next){
  const token=req.cookies?.Hiba
  if(!token){
    return res.status(401).json({message:'Not found'})
  }else{
    const decoded=jwt.verify(token,secretKey)
    req.user=decoded
    next()
  }
}

app.get("/login", (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login',(req,res)=>{
  const {username,password}=req.body
  if(username===user.username&&password===user.password){
    const token=tokenFunction(user)
    res.cookie("Hiba", token, { httpOnly: true, maxAge: 3600000 });
    return res.status(200).json({message:'created'})
  }else{
    res.status(401).json({ message:"Invalid credentials"})
  }
})

app.get('/profile',authMiddleware,(req,res)=>{
  res.json({message:`Welcome ${req.user.name}`,user:req.user})
})

//logout functionality
app.get('/logout', (req, res) => {
  res.clearCookie('Hiba') // removes JWT from browser
  res.redirect('/login')
})


app.listen(`${PORT},()=>{console.log('http://localhost:3000/login')}`)