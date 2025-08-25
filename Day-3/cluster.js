//CLUSTER
//can be used to run multiple instances of Node.js
//cluster is a built-in module that allows us to create multiple worker processes (copies of Node.js application) that can share the same server port
//Node.js runs only on 1 CPU core.
// Even if our computer has 8 cores Node.js uses just one
// So if many users send requests, that single core gets overloaded
//Cluster module allows Node.js to make copies of itself (workers)
// each copy runs on a different CPU core
// all workers can share the same port

// const cluster = require("cluster");
// const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//   res.send(`Hello from Worker ${process.pid}`);
// });

// app.listen(3000, () => {
//   console.log(`Server running on port 3000, PID: ${process.pid}`);
// });

// create 2 workers
// cluster.fork();
// cluster.fork();



const cluster = require('cluster');
const os = require('os');

if (cluster.isPrimary) {
  const cpuCount = os.cpus().length;

  // workers create
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  // if any worker fails, create one
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code ${code}`);
    cluster.fork();
  });

} else {
  // Worker process: create Express server
  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello');
  });

  app.listen(3000, () => {
    console.log(`Worker PID ${process.pid} listening on http://localhost:3000`);
  });
}
