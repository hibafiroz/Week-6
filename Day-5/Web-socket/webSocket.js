// Real-time communication :
// it is a method where a client and server exchange data instantly, without the client repeatedly requesting updates.
//Unlike traditional HTTP requests which are request-response, real time communication allows bidirectional and continuous data flow

//WEB SOCKET:

//WebSockets provide connection btw client and server allows for real-time and bidirectional communication
//benefits--
// No need for repeated HTTP requests
// Bidirectional: Both client and server can send messages


// Feature	                     WebSockets	                            HTTP
// Connection--	            single connection	               New connection per request
// Communication--	    Bidirectional, full-duplex	           Unidirectional, request-response
// Example--	        Chat apps, live feeds	               Loading web pages, form submissions


//How WebSocket Creates a Two-Way Path
//1. Handshake (Initial Request)
//2. Full Duplex Channel: Once the handshake is successful, the connection is upgraded.
// A full-duplex communication channel is established,meaning both client and server can send and receive data simultaneously over the same connection


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