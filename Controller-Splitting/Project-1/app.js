const express=require('express')
const app=express()
const path=require('path')
const studentRoute = require('./routes/studentRoute');

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))
app.use(studentRoute)

app.listen(3000,()=>{console.log('http://localhost:3000/student')})