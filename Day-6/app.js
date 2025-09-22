const express=require('express')
const dotenv=require('dotenv').config()
const path=require('path')
const cookie=require('cookie-parser')
const studentRoute = require('./Routes/student-route')
const adminRoute=require('./Routes/admin-route')
const {user,authMiddleware}=require('./utils/auth')
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
app.use('/admin',adminRoute)  //home il kodthningil ivda /admin venda

app.get('/',(req,res)=>{
    res.render('home')
})

app.use(errorHandlingMiddleware)

app.get('/chat',(req,res)=>{
    const username='Hiba'
    res.render('chat',{username})
})

io.on('connection',(socket)=>{
    console.log('user connected',socket.id)
    socket.broadcast.emit('user-join','A user has joined')
    socket.on('message',(data)=>{
        const time=new Date().toLocaleDateString()
        io.emit('message', {...data,time:time })
    })
    socket.on('disconnect',()=>{
        io.emit('user has disconnected')
    })
})

server.listen(PORT,()=>{console.log(`http://localhost:${PORT}`)})














//.on()- listens/recieves to the event
//.emit()- sends/trigger the event