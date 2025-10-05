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
// A room is a subgroup of a namespace where sockets can join or leave.
//it is identified by a string name and the server can emit messages only to members of that room
// Each socket automatically has a private room named by its socket.id

//What is a Namespace?

//is a way to create separate communication channels on the same Socket.IO server.
// By default, all clients connect to the root namespace /, but we can define custom namespaces like /chat or /notifications.
// Each namespace has its own connection, events, and listeners, so messages in one namespace don’t interfere with others.
// It’s useful for organizing code, reducing unnecessary traffic


// Default namespace ("/")
io.on("connection", (socket) => {
  console.log("User connected to default namespace");
});
// Connect to default namespace
const socket1 = io(); 


// Custom namespace ("/chat")
const chat = io.of("/chat");
chat.on("connection", (socket) => {
  console.log("User connected to /chat namespace");
});
// Connect to custom namespace
const socket2 = io("/chat");

// Now, socket1 only gets events from / namespace.
// socket2 only gets events from /chat.

