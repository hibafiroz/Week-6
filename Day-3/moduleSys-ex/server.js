console.log('server.js starts')
//require('./first') //loads
import'./first.js'
console.log('server.js after first')

//require is synchronous, so the output will be--

//server.js starts
// first.js starts
// second.js starts
// third.js starts
// second.js after third
// first.js after second
// server.js after first

//import is asynchronous, but first it parases static import 
//output will be--

//third.js running
// second.js start
// second.js after third
// first.js start
// first.js after second
// server.js start
// server.js after first
