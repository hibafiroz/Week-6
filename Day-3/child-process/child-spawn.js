console.log('Child started with args:', process.argv.slice(2));
console.log('MY_ENV =', process.env.MY_ENV);

// Read message from parent
process.stdin.on('data', (buf) => {
  const msg = buf.toString().trim();
  console.log('Child received message:', msg);

  // send an error back
  console.error('This is an error message from child.');
});

process.stdin.on('end', () => {
  console.log('Child finished reading stdin');
})