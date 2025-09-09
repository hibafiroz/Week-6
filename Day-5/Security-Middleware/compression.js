// Compression:
// it is an Express middleware that automatically compresses responses using algorithms like 
// gzip or deflate, making data transfer faster and reducing bandwidth usage
//This reduces payload size and improves performance

// Express app sends a response compressed with an algorithm like gzip.
// Ex: "Hello World" becomes a tiny compressed binary blob
// Along with that response, the server adds a header:
// Content-Encoding: gzip
// This tells the browser: the body of response is compressed,  need to unzip it
// The browser automatically looks at that header and decompresses the data back to the original response (HTML,JSON,text etc.) before showing it to us


// Why is it needed?
// The server compresses the response to save network bandwidth.
// But compressed data is not human-readable and not directly usable.
// So the browser must decompress it back to its original form

// Without compression:
// Response size = 100KB

// With compression (gzip):
// Response size = 20KB


//setting up
//install 
const compression = require('compression');

// Apply compression middleware
app.use(compression());