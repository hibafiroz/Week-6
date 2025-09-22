// WebSocket is a protocol that gives us low-level, full-duplex communication but its very bare-bones. 
// For ex, with raw WebSocket theres no automatic reconnection if the client disconnects, no built-in way to handle multiple event types
// no easy broadcasting to groups of clients and no fallback if webSocket is blocked by firewalls or proxies

// Socket.IO

//Socket.IO is a library built on top of WebSocket.
// Its a realtime framework for web apps that can also fall back to HTTP long-polling if WebSocket isn’t available.
// Provides features like:
// Named events
// Auto-reconnect
// Rooms
// Namespaces
// Acknowledgements

// Why use Socket.IO (vs raw WebSocket)?
// Auto-reconnect with backoff when the network drops.
// Custom event names instead of one "message" pipe.
// Rooms (group targeting) & Namespaces (segment features).
// Acks (callbacks) for delivery confirmation.
// Built-in heartbeats & timeouts to detect dead connections.
// Fallbacks (long-polling) if proxies block WebSocket.
// Easier CORS/auth hooks at connect time.
// Keeps connections alive automatically with built-in heartbeats.

//Socket.IO consists of two parts:
// A client-side library that runs in the browser
// A server-side library for Node.js

// in socket io, Everything is event-based.
// Two types of events:
// Automatic (built-in) → triggered by the library itself
// Custom (user-defined) → you decide the name & behavior
// Automatic Events:
// connect → fires when a client connects
// disconnect → fires when a client disconnects
// connect_error → fires if connection fails
// error → fires if something goes wrong

//Setting up:
 //server side installation:
//  npm install socket.io

//client side installation:
//option 1: cdn
<script src="https://cdn.socket.io/4.5.0/socket.io.min.js"></script>
//option 2:npm
// npm install socket.io-client
//option 3:es module
import { io } from 'socket.io-client';

//what it implement:
// User join event: Notify everyone when a new user joins.
// User leave event: Notify everyone when a user disconnects.
// Realtime message broadcasting: Chat messages are shared instantly with all connected clients

//EVENtS:
//built in event: connection, disconnect, error
//custom event: chat message,typing,user joined


// What are Rooms?
// A room = a private channel inside Socket.IO.
//Rooms are server-side groups identified by a string name. A socket can join or leave a room, and the server can then emit messages only to members of that room
// Clients (sockets) can join/leave rooms
// Server can send messages only to members of that room.
// Each socket automatically has a private room named by its socket.id.


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