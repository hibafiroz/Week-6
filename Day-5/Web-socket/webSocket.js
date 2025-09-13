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


//How WebSocket Creates a Two-Way Path
//1. Handshake (Initial Request)
//2. Full Duplex Channel: Once the handshake is successful, the connection is upgraded.
// A full-duplex communication channel is established,meaning both client and server can send and receive data simultaneously over the same connection.

// from browser:
// The browser sends an HTTP request with special headers:
// Upgrade: websocket
// Connection: Upgrade
// Upgrade: websocket: Tells the server to upgrade the protocol.
// Connection: Upgrade: Indicates that the connection should be upgraded.

// From Server (Response):
// The server responds with:
// HTTP/1.1 101 Switching Protocols
// 101 is the status code that means the server agrees to switch to WebSocket protocol.
// Switching Protocols is the message confirming the successful protocol upgrade.


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


//Every WebSocket object has a readyState that indicates the current status of the connection:
// | **Value** | **Constant** | **Meaning**                                              |
// | --------- | ------------ | -------------------------------------------------------- |
// | `0`       | `CONNECTING` | The connection is still being established.               |
// | `1`       | `OPEN`       |  The connection is open and ready to send/receive data.  |
// | `2`       | `CLOSING`    | The connection is in the process of closing.             |
// | `3`       | `CLOSED`     | The connection is closed and can't be used anymore.      |

//Checking readyState
if (socket.readyState === WebSocket.OPEN) {
  socket.send('Hello Server!');
} else {
  console.log('WebSocket not ready yet. Current state:', socket.readyState);
}
//why imp:
//Prevents sending messages before the connection is ready