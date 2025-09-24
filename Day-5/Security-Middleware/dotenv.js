//Dotenv:
//it helps manage environment variables securely by loading them from a .env file into process.env
// instead of hardcoding sensitive values, we keep them in a separate file that is not pushed to GitHub.

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