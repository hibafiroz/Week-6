//Centralized Error Handling in Express

// Instead of writing try–catch in every route, we write one central error handler that catches all errors from across the app

// How to Set It Up in Express
// Step 1:
//  Create Routes with Error Throwing

app.get('/test', (req, res, next) => {
    try {
        // Simulate an error
        throw new Error('Something went wrong!');
    } catch (err) {
        next(err); // Pass error to central error handler
    }
});

//next(err) usage:

//next(err) is used to pass an error to the central error-handling middleware
//instead of handling the error in every route, we can send it to one place ,the global error handler which improves code cleanliness

//Step 2:
 //add Central Error Middleware (at the bottom)

app.use((err, req, res, next) => {
    console.error(err.stack); // for debugging
    res.status(500).send('Something broke! ' + err.message);
});

// This function must have 4 parameters (err,req,res,next)
// Express automatically knows this is our central error handler

// Full example:

const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    try {
        throw new Error('Something broke!');
    } catch (err) {
        next(err); // sends to central handler
    }
});

app.use((err, req, res, next) => {
    res.status(500).send('Caught Error: ' + err.message);
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

// Step 3: 
// async Route Errors
// If you're using async/await we can wrap your route like this:

app.get('/async-error', async (req, res, next) => {
    try {
        // simulate async failure
        throw new Error('Async failure!');
    } catch (err) {
        next(err);
    }
});


// HANDLING UNCAUGHT EXCEPTION AND REJECTIONS

// Uncaught Exception
//  Errors that happen synchronously but are not wrapped in try–catch
// throw new Error("This is an uncaught exception");

// Unhandled Promise Rejection
//  A Promise is rejected but there’s no .catch() or try–catch to handle it
// Promise.reject("Something went wrong");


// How to Handle Them??

// 1. Handle Uncaught Exceptions

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    process.exit(1); // Optional: stopS app safely
});
// Good for catching sync code errors you missed.


// 2. Handle Unhandled Rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1); // Optional: restart using PM2 or Forever
});
//Good for catching async promise rejections not handled properly

