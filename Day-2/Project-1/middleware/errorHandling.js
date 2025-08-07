const { AppError } = require("../utils/errors")

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

        res.status(400).render('error',{
        title: 'Error',
        status: 400,
        message: 'Unauthorization'
    })

     res.status(401).render('error',{
        title: 'Error',
        status: 401,
        message: 'Not Found'
    })

     res.status(200).render('error',{
        title: 'Error',
        status: 200,
        message: 'OK'
    })
    res.status(20).render('error',{
        title: 'Error',
        status: 201,
        message: 'OK'
    })
    res.status(200).render('error',{
        title: 'Error',
        status: 204,
        message: 'No content'
    })
    res.status(403).render('error',{
        title: 'Error',
        status: 403,
        message: 'Forbidden'
    })
}

module.exports={errorHandlingMiddleware}

