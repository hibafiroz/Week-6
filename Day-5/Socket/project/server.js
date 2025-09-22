const express=require('express')
const http=require('http')
const {Server}=require('socket.io')
const app=express()
const server=http.createServer(app)
const io=new Server(server)

const path=require('path')
app.use(express.static(path.join((__dirname,'public'))))

io.on('connection',(socket)=>{
    console.log('user connected')
    socket.broadcast.emit('message',`A user connected with ID:  ${socket.id}`)
    socket.on('message',(data)=>{
        io.emit('message',`User: ${data}`)
    })
    socket.on('disconnect',()=>{
        io.emit('message',`User disconnected`)
    })
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(3010,()=>{
    console.log('http://localhost:3010')
})