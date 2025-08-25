const { exec } = require('child_process');

// Run: node child-exec.js 42
exec(
  'node child-exec.js 42',   // command as a full string

  // options
  {
    env: { ...process.env, MY_ENV: 'HelloWorld' }, // custom environment variables
    // cwd: __dirname,   // optional: working directory
  },

  // callback (runs after child process finishes)
  (error, stdout, stderr) => {
    if (error) {
      console.error('Exec error:', error);
      return;
    }
    console.log('STDOUT:\n', stdout);
    console.log('STDERR:\n', stderr);
  }
);
