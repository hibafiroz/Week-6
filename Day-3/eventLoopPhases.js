//Event Loop Execution Phases

// Node.js runs JavaScript in a single thread using the V8 engine
// To handle asynchronous tasks (like reading files or making HTTP requests), Node uses libuv’s event loop
// The event loop runs in phases, and each phase has a queue of callbacks to execute

// The Six Main Phases--

// 1. Timers Phase
// Executes callbacks scheduled by:
// setTimeout()
// setInterval()
// These callbacks only run if their timer has expired (even if it is 0, it waits for this phase)

//setTimeout(,1000) does not guarantee it will run exactly after 1 second. bcz --
//--the callback is placed in the Timers Phase queue after the delay, and runs when the event loop is free. If the loop is busy, it’ll be delayed even more



//2. Pending callBack phase:m
//Some async operations didn’t finish in the right phase last time
//instead of losing them, Node saves them here for the next cycle
// Pending Callbacks Phase runs them now
//ex: Error callbacks from failed network requests



// 3. Idle / Prepare Phase (internal use):
// Used internally by Node.js, not directly accessible in the code
// Prepares the event loop for the next phase

// This is a short moment where JavaScript isn’t running your code yet — it’s just Node.js + libuv getting ready for the next phase
// idle phase- The event loop is literally idle for a tiny moment while it waits for the next poll to start.
// prepare phase- Node.js uses this moment to prepare internal data needed for the Poll phase 



// 4. Poll phase:
//The Poll phase is like the control room 
// Run all I/O callbacks that are ready
// This includes things like:
// Reading a file (fs.readFile)
// Receiving data from the internet (HTTP request)
// Database query results

fs.readFile("data.txt", "utf-8", (err, data) => {
    console.log("File content:", data); // This runs in poll phase
});

// If nothing is ready, Node.js might wait(block) here for a short while until:
// New I/O events finish (file read completes, network responds)

// If a timer is about to expire, it won’t wait too long — it’ll move on to the Timers phase in the next tick.
// it is called heart of loop Because most asynchronous work (network requests, file reads, DB calls) is handled right here

// If there are I/O callbacks ready - execute them immediately
// If there are no callbacks ready:
// If timers are pending - exit poll and move to Timers Phase
// If no timers - wait for new events (blocking wait)


//I/O polling:
//I/O polling is the activity that happens inside the Poll Phase where libuv checks for completed I/O operations (file reads/writes,network data) and retrieves their results from the OS

//When Node.js (via libuv) needs to do something like read a file:
// libuv makes a system call to the OS (like read(), open(), etc)
// The OS kernel talks directly to the hardware (your disk, network card, etc)
// When the operation finishes, the OS notifies libuv through mechanisms like: IOCP (Windows)
// libuv then runs our callback in the poll phase

//OS means the software layer that sits btw our hardware and our applications
// me → Node.js
// Node.js → libuv
// libuv → Operating System
// OS → Hardware (read from disk)
// OS → libuv (done!)
// libuv → our callback



// 5. Check Phase:
//This is the phase where setImmediate() callbacks run
//differernce-- 
//setTimeout(fn, 0) runs in the Timers phase of the next loop iteration
//setImmediate(fn) runs at the end of the current loop (after Poll)

const fs = require('fs');

fs.readFile(__filename, () => {
    setTimeout(() => console.log('timeout 0'), 0);
    setImmediate(() => console.log('immediate'));
});
//output:
//immediate
//timeout 0
//why? bcz File read finishes and Poll phase ends and Check phase runs setImmediate() first, Then the loop starts again and Timers phase runs setTimeout()



// 6. Close Callbacks Phase
//Executes cleanup callbacks like socket.on('close', ...) or when a file handle is closed


//These phases are of callback queue present in libuv and after Each phase completion, it visits two microtask queue(nextTick,promise).


ex:
setImmediate(()=>{
    console.log('setImmediate')
})
setTimeout(()=>{
    console.log('setTimeout')
,0})
Promise.resolve().then(()=>{
    console.log('promise')
})
process.nextTick(()=>{
    console.log('nexttick')
})

//first prints nexttick,promise,setTimeout,setImmediate (nextTick has first priority in node then microtask queue then callback queue)
//if setTimeout has 1000 delay, then prints nexttick,promise,setImmediate,settimeuot bcz it runs after delay


//Thread Pool (fs module,dns module,crypto module)
//The Thread Pool is a set of background worker threads managed by libuv to handle heavy,
// non-blocking tasks (like file I/O, DNS, and crypto) outside the main event loop
//This keeps Node.js fast and non-blocking even though it runs JavaScript on a single main thread

//By default, libuv thread pool has 4 worker threads
//This size is controlled by the environment variable:

UV_THREADPOOL_SIZE

//You can increase it up to a maximum of 128 threads 
//ex if i want to set 8-- 

UV_THREADPOOL_SIZE=8 node app.js

//why just 4? bcz many I/O operations in node.js are already handled by the OS asynchronously ,don’t need threads. 4 is enough

