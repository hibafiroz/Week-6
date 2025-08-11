//JS Engine & Node Internals--

//The V8 engine is Google’s open-source JavaScript engine written in C++. It takes JavaScript code, parses it, and compiles it into machine code for fast execution.

// Node.js uses V8 to run JavaScript outside the browser and adds its own built-in APIs — like fs, http, os, and timers — which JavaScript alone doesn’t provide. These Node APIs are implemented in C/C++ and interact with libuv, a C library that manages the event loop and thread pool for asynchronous I/O.
// node api provide
//  File system access (fs)
// Network requests (http, net)
// Timers (setTimeout, setInterval)
// OS info (os)

// The flow is: JavaScript → V8 → Node API → libuv → Event Loop → Callback → back to V8.


// example:
fs.readFile('data.txt', 'utf8', (err, data) => {
  console.log(data);
});

// Our JavaScript code runs on V8
// fs.readFile is a Node.js API
// This is passed to libuv which delegates it to a background thread
// Once reading is done, the result is added to the callback queue
// Event loop picks it up and executes callback in V8

//libv
//libuv is a C library used by Node.js for asynchronous I/O.

// It handles:

// File system operations
// DNS lookups
// Some crypto functions
// Network sockets
// It uses an event loop + thread pool to make blocking tasks non-blocking in JavaScript


// Role of the Thread Pool
// JavaScript in Node.js runs in a single main thread (V8 engine).
// But some I/O operations are blocking at the OS level (e.g., reading a big file).
// libuv solves this by using a pool of worker threads (default: 4, can be changed via UV_THREADPOOL_SIZE).

// Flow
// JavaScript calls a Node API like fs.readFil
// The request is sent to libuv’s thread pool.
// A worker thread executes the blocking operation.
// When done, it sends the result back to the event loop.
// The event loop calls your callback in the main thread.


// Event-Driven Architecture
// Core idea: “Don’t wait — register a callback and move on.”
// The event loop listens for events (like file read finished, network response arrived).
// When an event happens:
// The corresponding callback is queued.
// Once the main thread is free, the callback runs.
// This makes Node.js non-blocking, allowing it to handle thousands of concurrent requests.

const fs = require('fs');

console.log("Start");

fs.readFile('bigfile.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log("File read complete");
});

console.log("End");

// fs.readFile → Sent to libuv thread pool.
// Worker thread reads file in background.
// Main thread continues to next line (console.log("End")).
// When read finishes, event loop runs callback → "File read complete"