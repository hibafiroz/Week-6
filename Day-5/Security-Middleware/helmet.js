//HELMET
//A middleware that automatically sets security related HTTP response headers
//it helps protect apps from common vulnerabilities like:

// XSS (Cross-Site Scripting)
// Clickjacking
// MIME type sniffing
// Information leakage through headers

//Setting up:
//install: 
//npm install helmet

const helmet = require('helmet');
app.use(helmet());

//without helmet, the response header shows X-Powered-By: Express which is good for attackers
//with helmet, X-Powered-By is gone and multiple security headers are addedd automatically

//Limitations:
// Helmet does not stop all attacks
// we still need authentication, validation etc

//what headers Helmet manages:

// Content-Security-Policy: Stops loading malicious scripts
// X-Frame-Options: Prevents clickjacking
// Strict-Transport-Security: Forces HTTPS
// X-Content-Type-Options: Blocks MIME sniffing
// Referrer-Policy: Limits referrer info
// Cross-Origin-Resource-Policy: Restricts resource sharing.

//we can also customise the helmet:
// for ex:
app.use(
  helmet({
    contentSecurityPolicy: false, // disable CSP if not needed
  })
);
