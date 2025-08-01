const express=require('express')
const app=express()
const path=require('path')
const adminRoute=require('./routes/admin-Route')
const studentRoute=require('./routes/student-Route')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

// import('./controller/moduleType.mjs').then(({welcome})=>{
//      app.get('/welcome',welcome)
// })

// (async()=>{
//     const {welcome}=await import('./controller/moduleType.mjs')
//      app.get('/welcome',{welcome})
// })();

app.get('/',(req,res)=>{
    res.render('home')
})

app.use(express.urlencoded({extended:true}))
app.use(adminRoute)
app.use(studentRoute)

app.listen(5000,()=>{console.log('http://localhost:5000')})