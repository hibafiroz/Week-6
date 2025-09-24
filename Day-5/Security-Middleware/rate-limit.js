// Rate Limiting:

//is a technique to restrict how many requests a client can make to server in a given time
// Why?
// To prevent brute-force attacks (e.g., repeatedly guessing passwords)
// To protect server resources from being overloaded

// it Keeps track of requests per IP
// Blocks requests after a limit is exceeded
// and Sends an HTTP response like 429 Too Many Requests

//setting up:
//install 
//npm i express-rate-limit
//require them and use

// Create a limiter: max 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15*60*1000,   // 15 minutes
  max: 100,                   // limit each IP to 100 requests
  message: 'Too many requests, please try again later.',
});

// Apply to all routes
app.use(limiter)