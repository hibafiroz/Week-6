//thread pool (via libuv) to handle I/O operations like file reading etc
//Worker Threads are used for CPU-intensive tasks like Image processing, Math calculations etc
//worker pool is created manually by us but thread pool is behind the scene that handles node

//1. WORKER THREAD:

//A Worker Thread is a way in Node.js to run JavaScript code in parallel
// it runs in the same process
// it gets its own V8 instance
// it gets its own event loop
//They do not share memory directly
// But since it’s still in the same process, we can share memory between them using SharedArrayBuffer
// Communication is done using message passing

// What is a Worker Pool?
// A worker pool is a collection of worker threads that we can reuse
// Instead of creating a new worker every time(which is expensive), we Create a fixed number of workers in a pool.

//To create worker thread, node js provides us a built in module called worker_threads

//Main.js
const { Worker } = require('worker_threads');

new Worker('./worker.js');  //creating the worker instance using Worker

worker.on('message', (msg) => {
  console.log('Message from worker:', msg); //to get message from worker file or vice versa
});

worker.on('error', (err) => {
  console.error('Worker error:', err);
});

worker.on('exit', (code) => {
  console.log('Worker exited with code', code);
});

worker.on('online', () => {
    console.log('Worker thread is online!');
});  //This event fires once, when the worker thread has started running
//it doesnt carry msgs from the worker. it just signals 'Hey the worker is running'


//Worker.js
const { parentPort } = require('worker_threads');

let sum = 0;
for (let i = 0; i < 1e9; i++) {
  sum += i;
}

parentPort.postMessage(sum);  //Used for communication with the main thread(can send messages back and forth)

//And to get data from main file we use WorkerData
//Data passed from the main thread when creating the worker

// main.js
const worker = new Worker('./workerFile.js', { workerData: {num:25} });

// workerFile.js
const { workerData, parentPort } = require('worker_threads');
console.log(workerData); // {num:25}
parentPort.postMessage('Done!');

//OR

const { workerData, parentPort } = require('worker_threads');
const {num}=workerData
console.log(num); // 25
parentPort.postMessage('Done!')