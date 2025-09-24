// Morgan:
//it is a logging middleware that records details about http request like method, URL, status, and response time

const morgan = require("morgan")

// Why Morgan?
// Debugging: we can See what requests are hitting our server like method, URL, status, response time
// Tracking: can track which routes are user used mostly
// Error spotting: we can quickly find failing requests like 404, 500

// When a request comess, Morgan prints info like
// GET /api/users 200 15.237 ms - 123
//here-
// GET: HTTP method
// /api/users: requested route
// 200: status code
// 15.237 ms: response time
// 123: response size in bytes

//setting up:
//install
// npm i morgan

//require them
const morgan = require('morgan');

// Use morgan middleware
app.use(morgan('dev')); 
//here 'dev' is for Short, colored, and useful in development
//'tiny': Minimal info like GET / 200 13 - 50
//'common': Standard Apache style like ::1 - [09/Sep/2025:10:30:00 +0530] "GET /index.html HTTP/1.1" 200 150
//'combined': Like 'common' but with more details like ::1 - - [09/Sep/2025:10:30:00 +0530] "GET /index.html HTTP/1.1" 200 150 "-" "Mozilla/5.0"

