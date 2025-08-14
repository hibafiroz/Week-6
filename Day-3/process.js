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

// Node.js Starts

//1. Create the process object
//Before JS runs, Node creates the global process object and gives main thread given by os

//2. It sets up libuv (handles async I/O and the event loop)
//It initializes V8 (the JavaScript engine that will run your code)
//It prepares Node.js’ built-in libraries (fs,path,http...) and globals(argv,env,buffer,__dirname,__filename,setTimeout...)
//Parse CLI → Node looks at the arguments we passed in the terminal (node app.js hello world) and stores them in process.argv.
//Parse Environment -> Node reads environment variables from the operating system (like PORT=3000) and stores them in process.env
//Both steps happen before code runs, so we can use process.argv and process.env right from the first line of our script

//3. Node decides Module system and entry scripts

// CommonJS (require) is the default if our file has a .js extension and no "type": "module" in package.json and it is synchrornous
// ESM (import) is used if: (asynchronous but parses static import line first->means all import lines will run first)
// file has a .mjs extension or
// package.json has "type": "module"
// This decision affects how Node loads and interprets the file.

// entry script- Node figures out the entry point based on:
// The path we give(node app.js -> runs app.js)
// If we run just node, it checks package.json:
// "main" field -> entry file
// Defaults to index.js if none specified

//4. after finding out entry file, it loads that file

//5. Top-level code runs synchronously
//When a module is loaded, Node executes all the code that are not inside a callback promise or event listener immediately and in order
console.log('A');      // runs immediately
setTimeout(() => {
  console.log('B');    // scheduled for later
}, 0);
console.log('C');      // runs immediately
// Output: A, C, B
//A and C are top-level synchronous code, so they run right away

//Synchronous code is executed directly on the js call stack
//When you do something asynchronous (ex- fs.readFile,setTimeout,fetch) Node does not block
//instead it hands the work to libuv
//Thread pool — for CPU-bound or blocking tasks like file I/O(heavy tasks)
//I/O polling — for network sockets, timers, and event-based operations

//6. once Node finishes running all the top-level synchronous code, the event loop takes over
//a. Run top-level sync code 
//b. top-level work finishes -> event loop starts
//now Node sits idle, waiting for libuv to signal 'somethingss ready'

//Event loop phases
// Timers phase 
// I/O callbacks phase 
// Poll phase 
// Check phase 
// Close callbacks phase 
// Repeat until there are no more pending tasks or listeners

//7. callbacks return to JS to run
//when libuv detects that an async operation is complete, it queues the corresponding callback in the right event loop phase.
//the callback is then passed back to V8’s JS execution so it can run on the call stack, just like any other JS function.

//8. when does process exit?
// the process exits when two conditions are met:
// a. The call stack is empty: no synchronous JS code left to run
// b. The event loop queue is empty: no pending timers,i/o callbacks, microtasks, setImmediate...
