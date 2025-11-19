const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");

app.get("/groupChat", (req, res) => {
  res.render("groupChat", {
    username: "hiba",
    groupName: "myGroup"
  });
});


app.use(express.static(path.join(__dirname, 'public')));


io.on("connection", (socket) => {
  console.log("New socket connected:", socket.id);

  // Track joined rooms manually
  socket.joinedRooms = new Set();

  // Join room
  socket.on('joinRoom', ({ room, username }) => {
    socket.join(room);
    socket.joinedRooms.add(room); // store room manually

    // System message
    socket.to(room).emit("message", {
      type: "system",
      text: `${socket.id} joined the room`
    });
  });

  // Group chat
  socket.on("groupMessage", ({ room, from, text }) => {
    io.to(room).emit("message", {
      type: "user",
      from,
      text
    });
  });

  // Disconnect
  socket.on('disconnect', () => {
    socket.joinedRooms.forEach(room => {
      io.to(room).emit("message", {
        type: "system",
        text: `${socket.id} left the room`
      });
    });
  });
});

server.listen(3010, () => {
  console.log("Server running: http://localhost:3010/groupChat");
});
