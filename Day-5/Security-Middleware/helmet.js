//HELMET
//A middleware that automatically sets HTTP response headers secure
//it helps protect apps from common vulnerabilities like:

// XSS (Cross-Site Scripting)
// Clickjacking
// Information leakage through headers

//Setting up:
//install: 
//npm install helmet

const helmet = require('helmet');
app.use(helmet());

//without helmet, the response header shows X-Powered-By: Express which is good for attackers
//with helmet, X-Powered-By is gone and multiple security headers are addedd automatically

//we can also customise the helmet:
// for ex:
app.use(
  helmet({
    contentSecurityPolicy: false, // disable CSP if not needed
  })
);
