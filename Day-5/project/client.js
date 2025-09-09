const WebSocket=require('ws')
const readline=require('readline')//readline module, which allows reading user input from the terminal

// Create readline interface for user input
const r1=readline.createInterface({
    input: process.stdin,  //listen to what the user types from console
    output: process.stdout //prints prompts to the console
})

// Connect to the WebSocket server
const ws = new WebSocket('ws://localhost:8080')
//creates a new WebSocket client and connects to the server running on ws://localhost:8080.
// ws represents the client connection

//connection opened
ws.on('open',()=>{
    console.log('connected to webSocket-server')
    promptForMsg()  //to start asking the user for input
})

//listen for messages from the server
ws.on('message',(msg)=>{  //listens for messages sent by the server
    console.log(`Server: ${msg}`)
})

// Handle errors
ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

//Handle connection close
ws.on('close',()=>{     //triggered when the server or client closes the connection
    console.log('connection closed')
})

function promptForMsg(){
    r1.question('enter a message or "exit" to quit: ',(message)=>{
        if(message.toLowerCase()==='exit'){
            ws.close()   //closes the WebSocket connection
            r1.close()   //closes the readline interface
            return       //stops the function using return
        }
        ws.send(message)    //to send data over the WebSocket connection
        promptForMsg()     //calls again so the user can keep typing messages in a loop
    })
}
