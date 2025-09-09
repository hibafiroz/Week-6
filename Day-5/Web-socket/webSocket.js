// Real-time communication :
// it is a method where a client and server exchange data instantly, without the client repeatedly requesting updates.
//applications like chat apps, live notifications, online gaming...
//Unlike traditional HTTP requests which are request-response, real time communication allows bidirectional and continuous data flow
//Technologies used: WebSockets, Socket.IO, WebRTC.

//WEB SOCKET:

//WebSockets provide a persistent connection btw client and server allows for real-time and bidirectional communication
//benefits--
// Real-time updates: Instantly push data to clients
// No need for repeated HTTP requests
// Bidirectional: Both client and server can send messages
// Low latency: Messages are sent immediately


// Feature	                     WebSockets	                            HTTP
// Connection--	       Persistent, single connection	       New connection per request
// Communication--	    Bidirectional, full-duplex	           Unidirectional, request-response
// Overhead--	        Minimal after handshake	               Headers with every request
// Use Case--	        Real-time applications	               Traditional web pages, APIs
// Example--	        Chat apps, live feeds	               Loading web pages, form submissions

//WebSockets begin with an HTTP handshake(status code 101) before upgrading to the WebSocket protocol (ws:// or wss://)

//SETTING UP WEB SOCOKET

// install 
//npm install ws

//require it
const WebSocket = require('ws'); 

//create web socket server on port
const wss = new WebSocket.Server({ port: 8080 });
//wss stands for WebSocket Server andtells the server to listen on port 8080 for incoming WebSocket connections

//// Connection event handler
wss.on('connection', (ws) => {...}) 
//is an event listener triggered every time a new client connects to the server
//ws represents the individual client socket that just connected

//Message event handler
ws.on('message', (msg) => {...})
//listens for messages sent by this client
//msg contains the data sent from the client

//Close event handler
ws.on('close', () => {...})
//listens for when the client disconnects from the server

//EVENTS:
// connection (server): fired when a client connects to the server
// open (client): fired when the connection is established
// message: fired when a message is received
// error: fired when an error occurs
// close: fired when connection closed