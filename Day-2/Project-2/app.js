const express=require('express')
const fs=require('fs')
const path=require('path')
const router = require('./routes/postRoutes')
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.render('layout')
})
app.use(router)


app.listen(3000,()=>{console.log('http://localhost:3000')})