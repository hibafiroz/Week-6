//PROCESS

//A process is simply a running instance of a program.
// When we run Nodejs script (e.g., node app.js) Node creates a process to execute code
// this process contains information about the program, environment, and runtime

//process Object
//it is global, no need to import
//Node provides a global process object that lets us interact with the current process --
// we can read environment variables, get platform info, read command-line arguments, check memory usage, and even exit the process

//process properties
// process.pid - The process ID assigned by the OS
// process.version - Node.js version
// process.platform - OS platform (win32, linux, darwin)
// process.cwd() - Current working directory
// process.env - Environment variables
// process.argv - Arguments passed to the script

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


//Process.env--                      ❌

const user = process.env.USER || process.env.USERNAME || "Guest";
//This line tries to get your system username. If it can’t, it sets user to "Guest"

// process.env gives access to environment variables of our systm
// USER (Linux/Mac) or USERNAME (Windows) are common variables that store the logged-in user’s name
// || "Guest" means neither USER nor USERNAME is set


//Process.argv--                      ❌   
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

// 1. Node.js Starts

// we run the node command
//Node.js runtime is loaded into memory
//It sets up libuv (Node’s underlying C/C++ library) for event loop, async I/O, and timers

// 2. our Script File is Located
// Node looks for file.js in the current working directory

// if the file is missing it throws an error:
// Error: Cannot find module 'file.js'

// 3. The File is Read
// Node reads the file’s contents from disk.

// It’s treated as JavaScript text, not directly executed yet.

// 4.Code is Wrapped
// Node doesn’t run your JS file as-is.
// Instead, it wraps your code in a function:

(function(exports, require, module, __filename, __dirname) {
    // your file.js content here
});
//This is called the Module Wrapper Function — it gives you require, module.exports, __filename, and __dirname without you having to declare them.


// 5. Code is Compiled to Machine Code
// Node uses the V8 JavaScript engine (same as Chrome) to:
// Parse your JavaScript into an AST (Abstract Syntax Tree).
// Convert AST → bytecode.
// Optimize and compile bytecode → machine code.
// Node starts running your JavaScript synchronously from top to bottom.
// It creates a single-threaded event loop to handle async tasks (I/O, timers, promises).

// 6.Async Tasks Are Delegate
// When your code calls things like setTimeout, fs.readFile, or fetch:
// The call is delegated to libuv or background threads.
// Once finished, results are placed in a callback queue.
// The event loop picks them up when the main thread is idle.

//7. Process Lifecycle
// Your script keeps running as long as:
// There are pending timers,
// Ongoing async operations,
// Or open event listeners.
// Once everything is done, Node automatically calls:
// process.exit(0);



