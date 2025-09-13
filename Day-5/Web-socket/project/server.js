const {WebSocketServer} = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocketServer({port: 3000});

// Connection event handler
wss.on('connection', (ws) => {
  console.log('New client connected');
  
  // Send a welcome message to the client

  // Message event handler
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Echo the message back to the client
    //broadcasting to every client
    for(let client of wss.clients){
      client.send(message.toString())
    }
  });

  // Close event handler
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});