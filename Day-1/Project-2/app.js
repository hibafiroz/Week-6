const express=require('express')
const app=express()
const path=require('path')
const adminRoute=require('./routes/admin-Route')
const studentRoute=require('./routes/student-Route')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

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


app.use(adminRoute)
app.use(studentRoute)

app.listen(5001,()=>{console.log('http://localhost:5001')})