//we define a special error handling middleware with four parameters (err,req,res,next)
//this middlewareee catche any error that is passed using next(err) from any route or controller
//inside the middleware we can check the type of error and respond accordingly 
//for ex sending a custom msg and status code

const { NotFoundError, BadRequestError, AppError } = require("../utils/errors")

const errorHandlingMiddleware=(error, req, res, next) => {
    if (error instanceof AppError) {
        return res.status(error.status).render('error', {
            title: 'Error',
            status: error.status,
            message: error.message
        })
    }
    
        res.status(500).render('error',{
        title: 'Error',
        status: 500,
        message: 'Internal server error'
    })
}

module.exports={errorHandlingMiddleware}


//The instanceof operator checks whether an object belongs to a specific class or created using a specific constructor.
//for example--

// class Animal {}
// class Dog extends Animal {}

// const puppy = new Dog();

// console.log(puppy instanceof Dog);      // true 
// console.log(puppy instanceof Animal);   // true 
// console.log(puppy instanceof Object);   // true 

//puppy instanceof Dog - true bcz puppy was created using the Dog class and so on.

//why we use instanceof for Error Checking?
//in Express we have many types of errors
//when an error is thrown, we want to know what type of error it is so we can send the right response

