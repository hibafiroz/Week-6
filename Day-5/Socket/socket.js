// WebSocket is a protocol that gives us low-level, full-duplex communication but its very bare-bones. 
// For ex, with raw WebSocket theres no automatic reconnection if the client disconnects, no built-in way to handle multiple event types
// no easy broadcasting to groups of clients and no fallback if webSocket is blocked by firewalls or proxies

// Socket.IO

//Socket.IO builds on top of websocket and Handles --
// automatic disconnections and reconnections, rooms(easily create channels for group communication),
//event-based communication, broadcasting, and fallbacks which makes realtime apps much easier to build

//Use cases
//Real-time chat applications
// Live notifications
//online gaming
//live analytics

//Socket.IO consists of two parts:
// A client-side library that runs in the browser
// A server-side library for Node.js

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

