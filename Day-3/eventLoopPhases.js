//timers phase
//pending callback phase
//idle/prepare phase
//poll phase
//check phase
//close phase


//Event Loop Execution Phases

// Node.js runs JavaScript in a single thread using the V8 engine
// To handle asynchronous tasks (like reading files or making HTTP requests), Node uses libuv’s event loop
// The event loop runs in phases, and each phase has a queue of callbacks to execute

// The Six Main Phases--

// 1. Timers Phase
// Executes callbacks scheduled by:
// setTimeout()
// setInterval()

//setTimeout(,1000) does not guarantee it will run exactly after 1 second. bcz --
//--the callback is placed in the Timers Phase queue after the delay, and runs when the event loop is free. If the loop is busy, it’ll be delayed even more



//2. Pending callBack phase
//Some async operations didnt finish in the right phase last time
//instead of losing them, Node saves them here for the next cycle
//ex: Error callbacks from failed network requests



// 3. Idle / Prepare Phase:
// it is not accessible directly in the code , it is Used internally by Node.js

// idle phase- The event loop is idle for a tiny moment while it waits for the next poll to start.
// prepare phase- Node.js prepares internal data needed for the Poll phase 



// 4. Poll phase:
//The Poll phase is like the control room 
// Run all I/O callbacks that are ready
// This includes things like:
// Reading a file (fs.readFile)
// network request
// If nothing is ready, Node.js wait here for a short while until New I/O events finish
// If a timer is about to expire, it wont wait ,it’ll move on to the Timers phase in the next tick.
// it is called heart of loop Because most asynchronous work (network requests, file reads, DB calls) is handled right here



//I/O polling:
//, I/O polling is the mechanism present inside the poll phase that waits for I/O operations to finish and then executes their callbacks when theyre ready



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

// This phase executes callbacks for closed handles, like:
// socket.on('close', …)
// server.on('close', …)

// after Each phase completion, it visits two microtask queue(nextTick,promise).

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
//The Thread Pool is a set of background worker threads managed by libuv to handle heavy, blocking tasks outside the main event loop
//This keeps Node.js fast and non-blocking

//By default, thread pool has 4 worker threads
//This size is controlled by the environment variable:
//we can increase it up to a maximum of 128 threads 
//ex if i want to set 8-- 

UV_THREADPOOL_SIZE=8 node app.js

//why just 4? bcz many I/O operations in node.js are already handled by the OS asynchronously ,don’t need threads. 4 is enough