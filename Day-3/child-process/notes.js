// CHILD PROCESSES
// A child process in Node.js is a separate program that runs outside of main Node.js process but can be created and controlled by it

// It allows Node.js to:
// Execute other scripts
// Perform heavy tasks without blocking the main event loop

// Why use child processes?
// Node.js runs on a single thread so cpu heavy tasks can block everythingg
// They are like extra workers running in separate memory spaces

// to create child processes, node.js has a built-in child_process module

// It gives 4 main methods:

// spawn() – starts a new process for continuous data(streams)
// exec() – Runs a command and buffers the output in memory (good for short tasks)
// execFile() – Runs a file directly without a shell
// fork() – Special case of spawn() to run another Node.js script


//using exec
const { exec, execFile } = require("child_process");

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

const ls = spawn('ls', ['-lh', '/usr']); 
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


// | Feature        | Worker Thread | Child Process                |
// | -------------- | ------------- | ---------------------------- |
// | Same process?  |  Yes          |   No                         |
// | Shares memory? |  Possible     |   No                         |
// | Best for       | CPU tasks     | Separate programs / commands |



//In Node.js, we can create additional processes from our main Node process
//this is done using the child_process module (ex: spawn,exec,fork)
// The new process that gets created is called a child process
//we have 4 api's to create child process

//1. spawn- for continous task(gives contionuos output)(can run any lang like python etc)
spawn(cmd,args,options) 
//options- 
// cwd: Current working directory of the child process
// env: Environment variables
// stdio: Controls input/output streams (pipe,ignore,inherit etc.)
// shell: if true, runs command inside a shell.
// detached: if true, child runs independently of the parent

spawn('node', ['child.js'], {
  cwd: './scripts',
  env: { NODE_ENV: 'production' },
  stdio: ['pipe', 'pipe', 'pipe']
});

//events:
//1. 'spawn' →
// Triggered when the process is successfully created.

cp.on('spawn', () => {
  console.log('Child process started');
});


//2.  'error' →
// Triggered if the process failed to start (e.g., command not found, no permission).

cp.on('error', (err) => {
  console.error('Failed to start:', err);
});


// 3. 'exit' →
// Triggered when the process ends (i.e., exits with a code or signal).

cp.on('exit', (code, signal) => {
  console.log(`Child exited with code ${code}, signal ${signal}`);
});


// 4. 'close' →
// Triggered when the stdio streams are closed (after exit).

cp.on('close', (code) => {
  console.log(`Child process closed with code ${code}`);
});

// Streams
//Communication is via streams (stdin, stdout, stderr)

// cp.stdin → Writable stream (Parent → Child)
// cp.stdout → Readable stream (Child → Parent, normal output)
// cp.stderr → Readable stream (Child → Parent, errors)

cp.stdout.on('data', (data) => {
  console.log(`Output: ${data}`);
});

cp.stderr.on('data', (data) => {
  console.error(`Error: ${data}`);
});

cp.stdin.write('Hello child\n');


//2. exec-runs in shell(attacks are possible in shell so theres a lit risk) (after writing end, then only output is returned as callback)
//The output of the command (stdout + stderr) is collected in a buffer
// When the command ends the buffer is passed to main process as the callback function
exec(cmd,options,callback)

//3. execFile- (not in shell, direct in os. so its safe)
execFile(file,args,options,callback)

//4. fork- (only runs nodejs script)

fork(modulepath,args,options) 
//modulepath- (path to a Node.js module)
//They are connected with a communication channel
// Both processes can exchange messages using:
// send() → Parent or child sends a message
// .on('message') → Listens for incoming messages
// So, parent and child can send JSON messages back and forth

//fork is advanced than spawn bcz it has communication channel