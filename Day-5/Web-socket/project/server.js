const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Broadcast message to all open clients
    for (const client of wss.clients) {
      if (client.readyState === 1) { // 1 = WebSocket.OPEN
        client.send(message.toString());
      }
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});