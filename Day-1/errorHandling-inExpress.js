//Centralized Error Handling in Express

// that catches all errors from our routes in one place instead of handling them individually in every route.
// How to Set It Up in Express
// Step 1:
//  Create Routes with Error Throwing

app.get('/test', (req, res, next) => {
    try {
        // Simulate an error
        throw new Error('Something went wrong!');
    } catch (err) {
        next(err) // Pass error to central error handler
    }
})

//next(err) usage:
//next(err) is used to pass an error to the central error-handling middleware

//Step 2:
 //add Central Error Middleware (at the bottom)

app.use((err, req, res, next) => {
    console.error(err.stack); // for debugging
    res.status(500).send('Something broke! ' + err.message);
});

// This function must have 4 parameters (err,req,res,next)
// Express automatically knows this is our central error handler


// HANDLING UNCAUGHT EXCEPTION AND REJECTIONS

// Uncaught Exception
//  Errors that happen synchronously that are not wrapped in try–catch and it wont crashes app bcz when we throw err without try catch, express will handle it but aync will not

//in asynchronous-- if we throww err without try catch, it wont show any error in app until we go to that particular page where error threw. so from there, the app will crash over all
//so this is why it is called runtime error

// Unhandled Promise Rejection (just for async bcz promise itself async)
//  A Promise is rejected but there’s no .catch() or try–catch to handle it
// Promise.reject("Something went wrong");


// How to Handle Them??

// 1. Handle Uncaught Exceptions
//if any error is thrown without using try catch and we dont know where so we simply use this using process to handle uncaught exception
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message)
    process.exit(1); //  stopS app safely
    //1 means “exit due to an error”
});
//process is a built-in object in Node that contain all info and control of our app
//.on("uncaughtException", handler) listens for errors that are not caught anywhere in the app.


// 2. Handle Unhandled Rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1); 

});

// Differrent events in node js are--

// uncaughtException
// unhandledRejection
// SIGINT
// exit
// warning

//Why important: Prevents the app from crashing silently and allows graceful shutdown