const express = require('express')
const app = express()
const path = require('path')
const adminRoute = require('./routes/admin-Route')
const studentRoute = require('./routes/student-Route')
const { title } = require('process')
//const { NotFoundError, BadRequestError } = require('./utils/errors')
const { errorHandlingMiddleware } = require('./middleware/errorHandling')

process.on('uncaughtException',(err)=>{
    console.log(err.message)
    process.exit(1)
})
//process.exit(0)-- 0 is the standard exit code for success
//if we're handling a crash or uncaught error- we should not use exit(0)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// (async()=>{
//     const {welcome}=await import('./controller/moduleType.mjs')
//      app.get('/welcome',{welcome})
// })();

app.get('/', (req, res) => {
    res.render('home')
})

//
app.use(adminRoute)
app.use(studentRoute)


//Error handling middleware
app.use(errorHandlingMiddleware)

    // console.log('error', error.message)
    // //console.log(error.stack) //shows in which file the error occured exactly.
    // const status = error.status || 500 //if err.stauscode present,it will print or it will take 500.
    // const msg = error.message || 'Something went wrong' //if err.err.message present,it will print that or it will take my msg.
    // // res.status(status).send(msg)
    // res.status(status).render('error', {
    //     title: 'Error',
    //     status,
    //     message: msg
    // })

//if theres no error handling middleware defined,but next(err) is called- then express will handle, it will shows- in which file the error occured exactly in that route as shown in console.



app.listen(5001, () => { console.log('http://localhost:5001') })