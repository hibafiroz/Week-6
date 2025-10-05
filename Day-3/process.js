//PROCESS

//process is a global object that gives information and control of the current Node.js app
// When we run Nodejs script (ex, node app.js) Node creates a process to execute code

//process properties
// process.pid - The process ID assigned by the OS
// process.version - Node.js version
// process.platform - OS platform (win32, linux, darwin)
// process.cwd() - Current working directory
// process.env - Environment variables
// process.argv - Arguments passed to the scriptm

console.log("Process ID:", process.pid);
console.log("Node Version:", process.version);
console.log("Platform:", process.platform);
console.log("Current Directory:", process.cwd());
console.log("Environment:", process.env.NODE_ENV || "not set");
console.log("Arguments:", process.argv);


//process methods
// process.exit([code]) - Ends the process. 0 = success, 1 = error
// process.memoryUsage() - Memory usage info

//Process.env--
// it gives access to environment variables of our systm
// || "Guest" means neither USER nor USERNAME is set

//Process.argv--
//process.argv is an array of all command-line arguments
const args = process.argv.slice(2); // Removes 'node' & script path  
const name = args[0] || user; // Use CLI name or env name


//what happens when we run node--

// Node.js Starts

//1. Create the process object:
//2. Node sets up its environment:
//It sets up libuv (handles async I/O and the event loop)
//It initializes V8 (the JavaScript engine that will run your code)
//It prepares node APIs

//3. Node decides Module system and entry script:
// CommonJS is the default if our file has a .js extension and no "type": "module" in package.json and it is synchrornous
// ESM is used if:
// file has a .mjs extension or
// package.json has "type": "module"

// entry script- Node decides which file to run first.
// if we run node app.js -> runs app.js
// if we run just node, it checks package.json:
// "main" field -> entry file
// Defaults to index.js if none specified

//4. Top-level code runs synchronously:
//Synchronous code is executed directly on the js call stack
//asynchronous code are handed over to the libuv
//Thread pool — for CPU-bound or blocking tasks like file I/O(heavy tasks)

//5. Event loop takes over:
//Event loop phases
// Timers phase
// pending callbacks phase 
//IDLE/PREPARE PHASE
// Poll phase 
// Check phase 
// Close callbacks phase 
// Event loop repeats these phases until theres nothing left to do

//6. callbacks return to JS:
//When libuv finishes THE async task:
// Node pushes the callback onto the JavaScript call stack
// JS engine executes it like a normal function

//7. when does process exit?
// the process exits when two conditions are met--
// a. The call stack is empty: no synchronous JS code left to run
// b. The event loop queue is empty: no pending timers,i/o callbacks, microtasks, setImmediate...


// JS Engine & Node Internals

// 1. V8 Engine:
// it is Developed by Google and it is Written in C++
// Responsibilities:
// Compiles JS into machine code
// Executes code on the call stack. etc

// 2. Node.js APIs
// Extra features added on top of V8 so JS can interact with the system.
// Examples:
// setTimeout, setInterval, fs.readFile, fs.writeFile, HTTP/HTTPS


// How They Work Together
// JS code runs inside V8
// If JS calls a Node API (fs.readFile, setTimeout), it is not handled by V8.
// Node passes the task to libuv → event loop/thread pool.
// When done, callbacks are pushed back into V8’s call stack for execution.

////libuv is a C library used by Node.js for asynchronous I/O operations.
//why its imp?: bcz it gives Node.js non-blocking I/O capability so the main js thread doesnt get stuck waiting
// libuv decides:
// if the OS can do it asynchronously (ex- sockets) -> OS handles it
// if it cant be done asynchronously at OS level (like file system on some platforms), send it to the Thread Pool
// Once the task finishes, libuv puts a callback into the Event Loop queue to be execute
