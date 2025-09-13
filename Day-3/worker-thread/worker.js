const { parentPort } = require("worker_threads");

// Listen for messages from main
parentPort.on("message", (num) => {
  console.log("Worker received:", num);

  // Do some heavy calculation
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result *= i;
  }

  // Send result back to main
  parentPort.postMessage(result);
});
