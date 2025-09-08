const express=require('express')
const app=express()
const path=require('path')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))

const feedbackrouter=require('../project1/routes/feedback-routes')
app.use(feedbackrouter)
app.get('/',(req,res)=>{
    res.render('home')
})

// // 🛑 Error Handling Middleware (centralized)
// app.use((err, req, res, next) => {
//   console.error(err.stack);  //logs the full technical error details to the server console (not shown to the user)
//   res.status(err.status || 500).send(err.message || "Something went wrong!");
// });

app.listen(3000,()=>{console.log('http://localhost:3000')})


//when theres custom classes for error:

// app.use((err, req, res, next) => { 
//     const status=err.status
//     const message=err.message
//   res.status(status).render('error',{message,status});
// });


//where theres a separate middleware folder:
app.use((err, req, res, next) => { 
    const status=err.status
    const message=err.message
  res.status(status).render('error',{message,status});
})