//PROCESS

//A process is simply a running instance of a program (running instance mean The program is loaded into memory and the CPU is actively executing its instructions)
// When we run Nodejs script (e.g., node app.js) Node creates a process to execute code
// this process contains information about the program, environment, and runtime like
//Code (the program instructions)
// Data (variables, memory)
// Stack (for function calls)
// Heap (for dynamic memory allocation)
// Resources (files, network sockets etc.)

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

//1. Create the process object:
//Before JS runs, Node creates the global process object and gives main thread given by os

//2. Node sets up its environment:
//It sets up libuv (handles async I/O and the event loop)
//It initializes V8 (the JavaScript engine that will run your code)
//It prepares (node API) Node.js’ built-in libraries (fs,path,http...) and globals(argv,env,buffer,__dirname,__filename,setTimeout...)
//Parse CLI → Node looks at the arguments we passed in the terminal (node app.js hello world) and stores them in process.argv.
//Parse Environment -> Node reads environment variables from the operating system (like PORT=3000) and stores them in process.env
//Both steps happen before code runs, so we can use process.argv and process.env right from the first line of our script

//3. Node decides Module system and entry scripts:
// CommonJS (require) is the default if our file has a .js extension and no "type": "module" in package.json and it is synchrornous
// ESM (import) is used if: (asynchronous but parses static import line first->means all import lines will run first)
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
console.log('A');      // runs immediately
setTimeout(() => {
  console.log('B');    // scheduled for later
}, 0);
console.log('C');      // runs immediately
// Output: A, C, B
//A and C are top-level synchronous code, so they run right away

//Synchronous code is executed directly on the js call stack
//When we do something asynchronous (ex- fs.readFile,setTimeout,fetch) Node does not block
//instead it hands the work to libuv
//Thread pool — for CPU-bound or blocking tasks like file I/O(heavy tasks)
//I/O polling — for network request, timers, and event-based operations

// Thread pool: handles CPU-heavy async tasks then signals completion → callback goes to I/O callbacks phase
// I/O polling: handles network or timers, signals completion → callback goes to poll phase or timers phase

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
