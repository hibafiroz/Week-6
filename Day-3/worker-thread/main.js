const { Worker } = require("worker_threads");

// Create a worker and run worker.js
const worker = new Worker("./worker.js");

// Send a message to the worker
worker.postMessage(10);

// Listen for messages from worker
worker.on("message", (result) => {
  console.log("Result from worker:", result);
});

// Handle errors
worker.on("error", (err) => {
  console.error("Worker error:", err);
});

// When worker exits
worker.on("exit", (code) => {
  console.log("Worker exited with code", code);
});
