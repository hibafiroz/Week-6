
console.log("Child args:", process.argv.slice(2));

console.log("MY_ENV =", process.env.MY_ENV);

// Simulate error output
console.error("This is an error from child.");
