//PROCESS

//process is a global object that gives information and control over the current Node.js runtime
// When we run Nodejs script (ex, node app.js) Node creates a process to execute code
//we can read environment variables, get platform info, read command-line arguments, check memory usage, and even exit the process

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
// process.uptime() - Seconds the process has been running
// process.memoryUsage() - Memory usage info

setTimeout(() => {
  console.log("Uptime:", process.uptime(), "seconds");
  process.exit(0); // End the process
}, 2000);


//Process.env--

const user = process.env.USER || process.env.USERNAME || "Guest";
//This line tries to get your system username. If it can’t, it sets user to "Guest"

// process.env gives access to environment variables of our systm
// USER (Linux/Mac) or USERNAME (Windows) are common variables that store the logged-in user’s name
// || "Guest" means neither USER nor USERNAME is set


//Process.argv--
const args = process.argv.slice(2); // Removes 'node' & script path  
const name = args[0] || user; // Use CLI name or env name
//process.argv is an array of all command-line arguments


//process.exit(0,1)--
if (!name) {
  console.log("No name provided. Exiting...");
  process.exit(1); // Exit with error code 1 (error)
}
//process.exit(code) immediately stops the process.


//what happens when we run node--

// Node.js Starts

//1. Create the process object:
//Before JS runs, Node creates the global process object and gives main thread given by os

//2. Node sets up its environment:
//It sets up libuv (handles async I/O and the event loop)
//It initializes V8 (the JavaScript engine that will run your code)
//It prepares (node API) Node.js’ built-in libraries (fs,path,http...) and globals(argv,env,buffer,__dirname,__filename,setTimeout...)

//3. Node decides Module system and entry script:
// CommonJS is the default if our file has a .js extension and no "type": "module" in package.json and it is synchrornous
// ESM is used if: 
// file has a .mjs extension or
// package.json has "type": "module"
// This decision affects how Node loads and interprets the file.

// entry script- Node decides which file to run first.
// if we run node app.js -> runs app.js
// if we run just node, it checks package.json:
// "main" field -> entry file
// Defaults to index.js if none specified

//4. after finding out entry file, it loads that file:
//node reads the file and prepares to execute it

//5. Top-level code runs synchronously:
//When a module is loaded, Node executes all the code that are not inside a callback promise or event listener immediately and in order
//Synchronous code is executed directly on the js call stack
//When we do something asynchronous (ex- fs.readFile,setTimeout,fetch) Node does not block
//instead it hands the work to libuv
//Thread pool — for CPU-bound or blocking tasks like file I/O(heavy tasks)
//I/O polling — for network request, timers, and event-based operations

//6. Event loop takes over:
//once Node finishes running all the top-level synchronous code, the event loop takes over
//Event loop phases
// Timers phase 
// I/O callbacks phase 
// Poll phase 
// Check phase 
// Close callbacks phase 
// Event loop repeats these phases until theres nothing left to do

//7. callbacks return to JS:
//When libuv finishes an async task:
// it tells Node that the callback is ready
// Node pushes the callback onto the JavaScript call stack
// JS engine executes it like a normal function

//8. when does process exit?
// the process exits when two conditions are met--
// a. The call stack is empty: no synchronous JS code left to run
// b. The event loop queue is empty: no pending timers,i/o callbacks, microtasks, setImmediate...


// JS Engine & Node Internals

// 1. V8 Engine:
// it is Developed by Google used in chrome
// it is Written in C++
// Responsibilities:
// Compiles JS into machine code
// Executes code on the call stack.
// Handles memory management with heap
// Pure V8 only knows JavaScript no setTimeout, no fs, no http.


// 2. Node.js APIs
// Extra features added on top of V8 so JS can interact with the system.
// Examples:
// Timers → setTimeout, setInterval.
// File System → fs.readFile, fs.writeFile.
// Crypto → hashing, encryption.
// HTTP/HTTPS → server & client.
// Provided by Node internals and backed by libuv


// How They Work Together
// JS code runs inside V8
// If JS calls a Node API (fs.readFile, setTimeout), it is not handled by V8.
// Node passes the task to libuv → event loop/thread pool.
// When done, callbacks are pushed back into V8’s call stack for execution.