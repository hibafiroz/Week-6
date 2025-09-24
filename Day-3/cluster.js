//CLUSTER
//Node.js runs only on 1 CPU core.
// Even if our computer has 8 cores Node.js uses just one
// So if many users send requests, that single core gets overloaded
//cluster is a built-in module that allows us to create multiple instances of Node.js that can share the same server port
// each copy runs on a different CPU core


// lets create 2 workers
// cluster.fork()
// cluster.fork()


const cluster = require('cluster')
const os = require('os')

if (cluster.isPrimary) {   //means this is the main process(not a worker)
  const cpuCount = os.cpus().length  //finds how many CPU cores my system has

  // workers create
  for(let i = 0; i < cpuCount; i++){  //Creates one worker process per core
    cluster.fork()
  }

  //This block runs in worker processes. Each worker runs an Express server on port 3000
  // Worker process: create Express server
  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello');
  })

  app.listen(3000, () => {
    console.log(`Worker PID ${process.pid} listening on http://localhost:3000`)
  })
}