
console.log("Child args:", process.argv.slice(2));

console.log("MY_ENV =", process.env.MY_ENV);

// Simulate error output
console.error("This is an error from child.");
 //this is not shell through and exec is shell through (thats the only difference btw exec and execfile)