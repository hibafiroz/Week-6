class AppError extends Error{
    constructor(message,status){
        super(message)
        this.status=status
    }
}

class NotFoundError extends AppError{
    constructor(message,status){
        super(message,404)
    }
}

class BadRequestError extends AppError{
    constructor(message,status){
        super(message,400)
    }
}

class UnAuthorized extends AppError{
    constructor(message,status){
        super(message,401)
    }
}

module.exports={NotFoundError,BadRequestError,UnAuthorized}