const { spawn } = require('child_process');

// Command: node child.js 42
const cp = spawn(
  'node',                        // command
  ['child-spawn.js', '42'],         // args
  {
    cwd: __dirname,           // working directory
    env: { ...process.env, MY_ENV: 'HelloWorld' }, // custom env var
    shell: false,             // run inside shell? (false = direct)
    detached: false,          // true = child lives even if parent dies
    stdio: ['pipe', 'pipe', 'pipe'] // stdin, stdout, stderr
  }
);

// Handle normal output (stdout is a stream)
cp.stdout.on('data', (data) => {                  //The "data" event is the built-in event name for readable streams
  console.log('PARENT got STDOUT:', data.toString());
});

// Handle error output
cp.stderr.on('data', (data) => {
  console.log('PARENT got STDERR:', data.toString())
})

// Send data into child (via stdin)
cp.stdin.write('Hello child process!\n')
cp.stdin.end()

// Handle events
cp.on('spawn', () => console.log('Child process spawned! PID:', cp.pid));
cp.on('exit', (code) => console.log('Child exited with code:', code));
cp.on('close', (code) => console.log('Child closed with code:', code));
cp.on('error', (err) => console.error('Child process error:', err));