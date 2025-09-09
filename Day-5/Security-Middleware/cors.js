// CORS

//By default, browsers block requests from one domain to another for security
// for ex:
// Frontend runs on http://localhost:3000
// Backend runs on http://localhost:5000
//without cors, the browser blocks API requests because origins are different.

//It works by sending special HTTP headers like:

// Access-Control-Allow-Origin: defines which domains can access our API
// Access-Control-Allow-Methods: allows specific HTTP methods (GET, POST, PUT…).
// Access-Control-Allow-Headers: which custom headers are permitte

//Seeting Up:
//install
// npm i cors
const cors = require('cors')

// Allow all origins (not safe for production)
app.use(cors());

// Or allow only specific frontend
app.use(cors({
  origin: 'http://localhost:3000'   // frontend URL
}));