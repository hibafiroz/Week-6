const express=require('express')
const dotenv=require('dotenv').config()
const path=require('path')
const cookie=require('cookie-parser')
const studentRoute = require('./Routes/student-route')
const adminRoute=require('./Routes/admin-route')
const app=express()
const http=require('http')
const {Server}=require('socket.io')
const { errorHandlingMiddleware } = require('./middleware/errorHandling')
const server = http.createServer(app);
const io=new Server(server)  //socket.io instance

const PORT=process.env.PORT

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"))


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookie())

app.use('/student',studentRoute)
app.use('/admin',adminRoute)

app.get('/',(req,res)=>{
    res.render('home')
})

app.use(errorHandlingMiddleware)

app.get('/chat',(req,res)=>{
  const username='Guest'
  res.render('chat',{username})
})

server.listen(PORT,()=>{console.log(`http://localhost:${PORT}`)})














//.on()- listens/recieves to the event
//.emit()- sends/trigger the event