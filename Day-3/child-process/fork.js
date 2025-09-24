const { fork } = require('child_process');

// Command: node child-fork.js 42
// Options: custom cwd, env, stdio
const cp = fork(
  'child4.js',              // module path (must be a JS file)
  ['42'],                   // args passed to child
  {
    cwd: __dirname,         // working directory
    env: { ...process.env, MY_ENV: 'HelloWorld' }, // pass custom env variable
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']         // include IPC for messaging
  }
);

// Handle child stdout/stderr streams
cp.stdout.on('data', (data) => {
  console.log('PARENT got STDOUT:', data.toString());
});

cp.stderr.on('data', (data) => {
  console.log('PARENT got STDERR:', data.toString());
});

// Send a message via IPC (instead of stdin)
cp.send('Hello child process!');

// Listen for message from child via IPC
cp.on('message', (msg) => {
  console.log('PARENT got message (IPC):', msg);
});

// Handle child process lifecycle events
cp.on('spawn', () => console.log('Child process forked! PID:', cp.pid));
cp.on('exit', (code) => console.log('Child exited with code:', code));
cp.on('close', (code) => console.log('Child closed with code:', code));
cp.on('error', (err) => console.error('Child process error:', err));

// fork() is a special version of spawn() used to run another Node.js script as a child process.
// It automatically sets up a communication channel between parent and child using messages.