class AppError extends Error{  
    constructor(message,status){
        super(message)          
}
}

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
