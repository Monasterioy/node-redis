/**
 * @description function to unificated response success
 * @param req req of express
 * @param res req of express
 * @param msg message to send
 * @param status status to send
 */

const responseSuccess = ((req, res, msg, status) => {
    let statusCode = status || 200;
    res.status(statusCode).send({
        error: false,
        statusCode,
        msg
    })
})

/**
 * @param req req of express
 * @param res req of express
 * @param msg message to send
 * @param status status to send
 */


const responseError = ((req, res, msg, status)=> {
    let statusCode = status || 500;
    let statusMsg = msg || 'Internal server error' 
    res.status(statusCode).send({
        error: true,
        statusCode,
        msg: statusMsg
    })
})

export default {
    responseError,
    responseSuccess
}