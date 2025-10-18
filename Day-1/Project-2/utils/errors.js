//we can throw custom errors from anywhere without repeating logic

class AppError extends Error{          //why Base class? instaed of checking instance of everything, we can jst check baseclass instance.
    constructor(message,status){      //A constructor is just a special function inside a class that runs automatically when you create a new object from that class.
        super(message)               //super--inherit 'message' from built-in Error class. Without super(message), our error won’t have message or stack, and it won’t behave like a real JavaScript error.
        this.status=status          //add custom http status code
    }
}
//bcz notFoundError and BadRequestError both extend AppError they are both considered instances of AppError
//so with just one check we can catch all your custom errors

class NotFoundError extends AppError{
    constructor(message){
        super(message,404)
    }
}

class BadRequestError extends AppError{ 
    constructor(message){
        super(message,400)   

    }
}

module.exports={NotFoundError,BadRequestError,AppError}


//constructor is a special method in every class and it runs automatically when we create a new object from the class using new
//for ex

// class Person {
//   constructor(name) {
//     this.name = name
//   }
// }

// const p1 = new Person('Hiba');
// console.log(p1.name); // "Hiba"

//if we dont define a constructor the class cant accept message and status and the super() wont be called


//step by step how err handles

// user sends a request like /student/2
// controller tries to find the student
// if not found it throws new NotFoundError(...)
// next(err) sends error to middleware
// middlewara checks err instanceof AppError
// Sends a custom error page with correct status and message

//what if it a diffrnt erro?
// if we did like this
//throw new Error("DB crashed");
//then err instanceof appError would be false and middleware would show like

// 500: Internal Server Error