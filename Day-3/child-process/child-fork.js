console.log('Child started with args:', process.argv.slice(2));
console.log('MY_ENV =', process.env.MY_ENV);

// Receive IPC message from parent
process.on('message', (msg) => {
  console.log('Child received message from parent:', msg);

  // Reply back to parent
  process.send('This is a reply from child via IPC.');
});

// Simulate error output
console.error('This is an error message from child.');

// stdin/out still works, but fork is meant for IPC
process.stdin.on('end', () => {
  console.log('Child finished reading stdin');
});
