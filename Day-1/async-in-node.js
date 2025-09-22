//Asynchronous programming in Node.js

// Asynchronous programming in Node.js means that the code does not wait for tasks like file reading, database calls, or API requests to finish
//  Instead Node.js continues executing the next lines of code and handles the long-running task in the background.

// Why async??
//  Bcz Node.js handles many users at once If one user request takes time, Node can still handle others instead of freezing


//async/await syntax
async function myFunction() {
    try {
        const result = await someAsyncFunction();
        console.log(result);
    } catch (error) {
        console.log('Error:', error);
    }
}

// async keyword:

//Declares a function that always returns a Promise
// Used before a function to make it asynchronous

//  await keyword:

// Used before a promise
// It pauses the function until the promise is resolved or rejected
//This makes asynchronous code look and behave like synchronous code

//Real world example

async function getData() {
    console.log("Start");
    const data = await fetchData(); // waits here
    console.log(data); // prints data
    console.log("End");
}

getData();
// output:  Start
// (wait 2 seconds)
// Data loaded
// End


//Error Handling with try...catch

async function getData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (err) {
        console.log("Something went wrong:", err);
    }
}

// without try–catch if something fails, the app crashes
// with try–catch we can handle the error safely and show the user a friendly message


// What Are HTTP Status Codes?

// When a client sends a request, the server responds with a status code to describe the result
// 	200 for success
// 	201 for resource creation
// 	204 No Content
// 	400 for bad request
// 	401/403 for auth issues
// 	404 if not found
// 	500 if there's a server error