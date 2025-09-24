// Socket.IO

// Socket.IO is a real-time library built on top of WebSocket.
// If WebSocket fails, it falls back to HTTP polling.
// Key features:
// - Custom events
// - Auto reconnect
// - Rooms (group chats)
// - Namespaces (separate channels)

// Why Socket.IO over raw WebSocket?
// - Auto-reconnect on network drop
// - Named events (not just "message")
// - Rooms & Namespaces for grouping
// - Heartbeats to detect dead clients
// - Fallback to polling if WS blocked


// in socket io, Everything is event-based.
// Two types of events:
// Automatic (built-in) - triggered by the library itself
// Custom (user-defined) - you decide the name and behaviour
// Automatic Events:
// connect - fires when a client connects
// disconnect - fires when a client disconnects
// error - fires if something goes wrong

//Setting up:
 //server side installation:
//  npm install socket.io

//client side installation:
//cdn
<script src="https://cdn.socket.io/4.5.0/socket.io.min.js"></script>


//what it implement:
//Notify everyone when a new user joins and
//Notify everyone when a user disconnects.
// Realtime message broadcasting: Chat messages are shared instantly with all connected clients


// What are Rooms?
// A room = a private channel inside Socket.IO where A socket can join or leave
//it is identified by a string name and the server can emit messages only to members of that room
// Each socket automatically has a private room named by its socket.id


// How it works:
// Join a room
// Client asks → Server calls
// socket.join("roomName")

// Send message to room
// Server sends only to that room
// io.to("roomName").emit("event", data)

// Exclude sender (broadcast to others in room)
// socket.to("roomName").emit("event", data)

// Leave a room
// socket.leave("roomName")

// Private message (use socket’s unique id)
// io.to(socketId).emit("privateMessage", data)