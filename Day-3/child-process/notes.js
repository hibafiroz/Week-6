// CHILD PROCESSES
// A child process is a separate program that runs outside of main process but can be created and controlled by it
// It allows Node.js to Perform heavy tasks without blocking the main event loop

// It has 4 main methods:

// exec() – Runs a command and buffers the output in memory (good for short tasks)
// execFile() – Runs a file directly without a shell
// spawn() – starts a new process for continuous data(streams)
// fork() – Special case of spawn() to run another Node.js script

// 	If a thread crashes, it can crash the whole process.
// 	If a child process crashes, the parent process usually survives

// | Feature        | Worker Thread | Child Process                |
// | -------------- | ------------- | ---------------------------- |
// | Same process?  |  Yes          |   No                         |
// | Shares memory? |  Possible     |   No                         |
// | Best for       | CPU tasks     | Separate programs / commands |