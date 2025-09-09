const express=require('express')
const http=require('http')
const {Server}=require('socket.io')
const path=require('path')

const app=express()
const server=http.createServer(app)  //wraps express app into a real HTTP server
const io=new Server(server)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})

//Defines a GET route for /
//sends index.html as the response. This is the main chat page

//Handle connections
io.on('connection', (socket) => {
  console.log('A user connected');
//fired whenever a new client connects to the server
//socket represents that single client connection

socket.on('chat message',(msg)=>{   //Waits for messages from this client
    console.log('message recieved',msg)  //msg- the actual text sent by the client
    io.emit('chat message',msg)  //Broadcasts the message to all clients including the sender
})
//if we use socket.broadcast.emit() it would send to everyone except the sender

//Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
})
  //Useful for notifying other users

 server.listen(3000,()=>{
  console.log('http://localhost:3000');
}); 

