const express=require('express')
const app=express()
const path=require('path')
const studentRoute = require('./routes/studentRoute');
const fs=require('fs').promises
const filepath=path.join(__dirname,'../data/studentData')


app.get('/',(req,res)=>{
    res.render('home')

})
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
//app.set('data',path.join(__dirname,'data'))

app.use(express.urlencoded({extended:true}))
app.use(studentRoute)

app.listen(3000,()=>{console.log('http://localhost:3000')})