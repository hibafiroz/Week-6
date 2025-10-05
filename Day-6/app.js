const express = require("express")
const dotenv = require("dotenv").config()
const path = require("path")
const cookieParser = require("cookie-parser")
const studentRoute = require("./Routes/student-route")
const adminRoute = require("./Routes/admin-route")
const app = express()
const userList=require('./utils/userList.json')
const http = require("http")
const { Server } = require("socket.io")
const { errorHandlingMiddleware } = require("./middleware/errorHandling")
const { NotFoundError } = require("./utils/error")
const { studentAuthMiddleware } = require("./utils/auth")
const server = http.createServer(app)
const io = new Server(server) //socket.io instance

const PORT = process.env.PORT

app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/student", studentRoute)
app.use("/admin", adminRoute)

app.get("/", (req, res) => {
  res.render("home",{ query: req.query })
})

app.use(errorHandlingMiddleware)


app.get('/student/chat/:currentUserId-:otherUserId',studentAuthMiddleware, (req, res, next) => {
   const currentUserId = parseInt(req.params.currentUserId, 10)  
   const otherUserId = parseInt(req.params.otherUserId, 10)

  const currentUser = userList.find(u => u.id === currentUserId)
  const otherUser = userList.find(u => u.id === otherUserId)

  if (!currentUser || !otherUser) return next(new NotFoundError('Not Found'))

  const roomName = [currentUser.id, otherUser.id].sort((a,b)=>a-b).join('_')
  res.render('chat', { currentUser, otherUser, roomName })
})


io.on("connection", socket => {
  // Join a room group
  socket.on("joinRoom", ({ room, username }) => {
    socket.join(room);
    socket.to(room).emit('message', { type: 'system', text: `${username} joined.` })
  })

  socket.on("joinPrivateRoom", ( room ) => {
    socket.join(room)
  })

  // Group chat
  socket.on("groupMessage", ({ room, from, text }) => {
    io.to(room).emit('message', { from, text, type: 'user' })
  })

  // Private chat
  socket.on("singleMessage", ({ room, from, msg }) => {
    io.to(room).emit('singleMessage', { from, msg })
  })

  socket.on("disconnect", () => {
    io.to(socket.room).emit('message', { type: 'system', text: `${socket.username} left.` });
  }
  )
})

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})