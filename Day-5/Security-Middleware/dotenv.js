//Dotenv:
//it helps manage environment variables securely by loading them from a .env file into process.env
// Instead of hardcoding sensitive values (like database passwords, API keys, JWT secrets),
// we keep them in a separate file that is not pushed to GitHub.

//why dotenv?
//Security: Keep secrets out of code
// Config management:                              
// Convenience: Easy to update configs without touching source code like if i want to change port 3000 to 5000 we dont need to edit code, juz update .env


//example:
// .env file

// PORT=4000
// DB_USER=admin
// DB_PASS=supersecret123
// JWT_SECRET=mySecretKey

//server.js-
require('dotenv').config()
//When we call config() it looks for a file named .env in projects root folder
//it then reads all the key value pairs inside and loads them into process.env

console.log(process.env.PORT);    // 4000
console.log(process.env.DB_USER) // admin
