const { exec } = require('child_process')

// Run: node child-exec.js 42
exec('node child-exec.js 42',(error, stdout, stderr) => { //dir- list files in folder or node app.js - run a Node.js script
    if (error) {
      console.error('Exec error:', error);
      return
    }
    console.log('STDOUT:\n', stdout)
    console.log('STDERR:\n', stderr)
  }
)

// Runs a command in a shell and buffers the output.
// Good for small commands
