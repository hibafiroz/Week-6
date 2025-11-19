//Event Loop Queues Overview:

// Node.js has two important queues:
//1. Microtask Queue
//2. Event Queue

//1. Microtask Queue (High Priority Queue):

//it holds microtasks such as process.nextTick() and promise callbacks (Promise.then))
//Microtasks run immediately after the currently executing JS code finishes, before returning to the event loop to pick the next macrotask.

//process.nextTick():
// process.nextTick() is a Node.js-only function that lets us schedule a callback to run
console.log("A")

process.nextTick(() => {
  console.log("nextTick");
});

console.log("B");
// output: 
A
B
nextTick
//Because nextTick runs after current code (A & B) but before everything else.

//nextTick vs Promise:
process.nextTick(() => console.log("nextTick"))
Promise.resolve().then(() => console.log("promise"))
//output:
nextTick
promise  //nextTick runs first.

//2. Event Queue(Macrotask Queue / Callback Queue):

// The Event Queue (also called Callback Queue or Macrotask Queue) is a waiting line where JavaScript puts tasks that should run later, after microtasks are done.
// These tasks come from functions like:
// setTimeout()
// setInterval()
// setImmediate()
// I/O callbacks (file read, API response)
// DOM events (click, keypress)
//JavaScript will NOT run these immediately. it places them in the Event Queue to run after microtasks.

//ex: 
//Event Queue is lower priority than Microtask Queue
console.log("A")
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"))
console.log("B");
//output:
A
B
promise   - microtask runs first
timeout - macrotask runs later
//Because promise = microtask = higher priority.
// timeout = macrotask = lower priority.

// Event Loop Order:

// Run synchronous code
// Run all microtasks
// Run one macrotask
// Go back → run microtasks → macrotask → repeat

console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
process.nextTick(() => console.log("4"));
// output:
console.log("5");
1
5
4   (process.nextTick)
3   (Promise microtask)
2   (setTimeout event queue)
