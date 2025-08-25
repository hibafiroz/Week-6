const { execFile } = require('child_process');

// Run node, file = child-execFile.js, args = ['42']
execFile(
  'node',                      // command
  ['child-execFile.js', '42'],         // arguments
  {
    env: { ...process.env, MY_ENV: 'HelloWorld' }  // custom environment
  },
  (error, stdout, stderr) => {
    if (error) {
      console.error('ExecFile error:', error);
      return;
    }

    console.log('STDOUT:\n', stdout);
    console.log('STDERR:\n', stderr);
  }
);
