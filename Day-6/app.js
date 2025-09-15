const express=require('express')
const dotenv=require('dotenv').config()
const path=require('path')
const jwt=require('jsonwebtoken')
const cookie=require('cookie-parser')
const router = require('./Routes/student-route')
const {payload,user,tokenFunction,authMiddleware}=require('./utils/auth')

const PORT=process.env.PORT

const app=express()

app.use(express.static('public'))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookie())

app.use(router)

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/me',authMiddleware,(req,res)=>{
    res.json({message:'Hello logged in user',user:user.username})
})

app.listen(PORT,()=>{console.log(`http://localhost:${PORT}`)})