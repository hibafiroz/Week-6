const { execFile } = require('child_process');

// Run node, file = child-execFile.js, args = ['42']
execFile('node', ['child-execFile.js', '42'],         // arguments
  (error, stdout, stderr) => {
    if (error) {
      console.error('ExecFile error:', error);
      return;
    }
    console.log('STDOUT:\n', stdout);
    console.log('STDERR:\n', stderr);
  }
)

//Runs executable file directly without a shell.
// Slightly safer and faster than exec because it doesn’t use a shell.