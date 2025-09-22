//A Command-Line Interface allow user to interact with a program through a terminal or command prompt.
// Instead of using buttons or a graphical interface, we type commands and pass arguments and the program responds with text output

// In Node.js, process.argv is an array containing the command-line arguments.
// The first two values are always:
// process.argv[0] → path to Node.js binary
// process.argv[1] → path to our script file
// From process.argv[2] onwards → your actual inputs

// node app.js Hiba 25
// process.argv will be:

// [
//   '/usr/local/bin/node',   // node path
//   '/Users/hiba/app.js',    // file path
//   'Hiba',                  // process.argv[2]
//   '25'                     // process.argv[3]
// const args = process.argv.slice(2)   // removes node path + file path
// const name=args[0]||'stranger'
// console.log(`welcome ${name} `)


const args=process.argv.slice(2)
const numbers=args.map(Number)
const sum=numbers.reduce((acc,val)=>{return acc+val},0)
console.log(`sum is ${sum}`)