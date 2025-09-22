const { AppError } = require("../../Day-1/Project-2/utils/errors")

const errorHandlingMiddleware=(error,req,res,next)=>{
    if (error instanceof AppError) {
        return res.status(error.status).render('error', {
            title: 'Error',
            status:error.status,
            message: error.message
        })
    }

        return res.status(404).render('error',{
        title:'Error',
        status: 404,
        message: error.message
    })

     return res.status(401).render('error',{
        title:'Error',
        status: 401,
        message: error.message
    })

    return res.status(400).render('error',{
        title:'Error',
        status: 400,
        message: error.message
    })
}
module.exports={errorHandlingMiddleware}