const express=require('express')
const http=require('http')
const {Server}=require('socket.io')
const app=express()
const server=http.createServer(app)
const io=new Server(server)

const path=require('path')
app.use(express.static(path.join((__dirname,'public'))))

const cnsp=io.of('/namespace') //custom namespace, and we use cnsp wherever we use io

cnsp.on('connection',(socket)=>{
    console.log('user connected')
    socket.broadcast.emit('message',`A user connected with ID:  ${socket.id}`)
    socket.on('message',(data)=>{
        cnsp.emit('message',`User: ${data}`)
    })
    socket.on('disconnect',()=>{
        cnsp.emit('message',`User disconnected`)
    })
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(3010,()=>{
    console.log('http://localhost:3010')
})


//io.emit(...) is just a shorthand for io.sockets.emit(...)
//socket.broadcast.emit("event", data) = send to all other connected clients, but NOT back to the sender