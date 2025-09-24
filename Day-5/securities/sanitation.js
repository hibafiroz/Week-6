// Input sanitization 
// it means filtering user input before using it in app

// why important?
// if we dont sanitize inputs
// Hackers can inject javaScript: XSS (Cross-Site Scripting)
// Hackers can inject SQL code: SQL Injection
// Hackers can inject OS commands: Command Injection


//how to prevent this:
//1. Validate Input:
// Only allow data we expect
// if we ask for age, accept only numbers
// if we ask for email, check its in email format
if(!Number.isInteger(age)){
   throw new Error("Age must be a number")
}

//2. Sanitize With Libraries:
//Use ready-made tools that clean inputs automatically
// validator.js: check emails, URLs, etc
// DOMPurify: clean HTML and remove <script> tags.

// Ex:
const validator = require("validator");

if (!validator.isEmail(email)) {
   throw new Error("Invalid email");
}

//if we have validator.js then why we manually validates?
//Basic Validator is limited and it checks general rules like email, URL, numeric, alphanumeric.
// Custom Validation(manual) Checks app specific rules(our own rules) like age must be >=18 or Password must have at least one uppercase one number etc

//3. CSP Headers:
// Add Content-Security-Policy header so only trusted scripts/styles run on our site
// Ex header:
// Content-Security-Policy: default-src 'self'