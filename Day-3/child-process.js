//CHILD PROCESSES
// A child process in Node.js is a separate program that runs outside of main Node.js process but can be created and controlled by it

// It allows Node.js to:
// Run system commands
// Execute other scripts
// Perform heavy tasks without blocking the main event loop

// Why use child processes?
// Node.js runs on a single thread so cpu heavy tasks can block everythingg
// Child processes let you do work in parallel.
// They are like extra workers running in separate memory spaces

// to create child processes, node.js has a built-in child_process module

// It gives you 4 main methods:

// spawn() – starts a new process for continuous data(streams)
// exec() – Runs a command and buffers the output in memory (good for short tasks)
// execFile() – Runs a file directly without a shell
// fork() – Special case of spawn() to run another Node.js script


//using exec
const { exec } = require("child_process");

exec("node -v", (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Node version: ${stdout}`);
});

// exec() runs the node -v command
// stdout is the output
// stderr is any error output
// error is if the command itself fails

//When to use: Output is small (like checking node -v or git status)


// Using spawn() for streams
const { spawn } = require("child_process");

const ls = spawn("ls", ["-lh", "/usr"]);  
//ls -> shell command
//-l -> use a long listing format(Instead of only showing file names, it shows full details for each file like permissions, owner, size, and last modified date — in a table-like list)
//h-> human readable- sizes (KB, MB instead of just bytes)
//usr -> the folder to list


ls.stdout.on("data", (data) => {
    console.log(`Output: ${data}`);
});

ls.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
});

ls.on("close", (code) => {
    console.log(`Process exited with code ${code}`);
});

// spawn() doesn’t buffer; it streams output chunk-by-chunk
// Good for large outputs
// When to use:
// The output is large (ex- listing thousands of files)
// You want to process output in chunks


// Using fork()- to run another Node.js script
//runs: Another Node.js script with IPC (Inter-Process Communication)(message passing) enabled
//parent.js
const { fork } = require("child_process");

const child = fork("child.js");

child.on("message", (msg) => {
    console.log("Message from child:", msg);
});

child.send({ hello: "world" });

//child.js
process.on("message", (msg) => {
    console.log("Message from parent:", msg);
    process.send({ response: "hi parent!" });
});
//fork() allows easy message passing between parent and child Node.js scripts
//Parent and child will send JSON messages back and forth

// different uses of thread and child processes--
// in thread, Share the same memory space with the parent process.
// in child process, have their own separate memory space.

// 	If a thread crashes, it can crash the whole process.
// 	If a child process crashes, the parent process usually survives

// | Method  | Buffers Output? | Streams Output?  | IPC (send/receive messages)? | Best For                                         |
// | ------- | --------------- | ---------------- | ---------------------------- | ------------------------------------------------ |
// | `spawn` | No              | Yes               | No                          | Long-running tasks, big output                   |
// | `exec`  | Yes             | No                | No                          | Small, quick commands                            |
// | `fork`  | No              | No (IPC instead)  |Yes                          | Running other Node.js scripts with communication |


// buffers output? means- Does Node.js collect all the output from the process in memory first, and only give it to us once the process finishes?
// streams output? means- Does the child process send its output to us in small chunks as soon as it’s available, instead of waiting until the end?


//When Node detects a heavy or special type of task, it moves it away from the main thread.
//There are two common places it can move it:

//1. Worker Thread

//Node creates separate threads inside the same process.
// All threads share the same memory but each has its own event loop
// Communication is done using message passing
//Used for CPU-heavy tasks like:
// Math calculations
// Image processing

const { Worker } = require('worker_threads');

new Worker('./heavyTask.js');

// When you create a Worker Thread:
// it runs in the same process as the main thread
// it gets its own V8 instance
// it gets its own libuv event loop
// But since it’s still in the same process, you can share memory between them using SharedArrayBuffer

//2.Child Processes

//They are completely separate programs.

// No shared memory — they talk using messages.
// Used for:
// Running another Node script separately
// Running system commands

const { fork } = require('child_process');
fork('serverWorker.js');

// | Feature        | Worker Thread | Child Process                |
// | -------------- | ------------- | ---------------------------- |
// | Same process?  |  Yes          |   No                         |
// | Shares memory? |  Possible     |   No                         |
// | Best for       | CPU tasks     | Separate programs / commands |
