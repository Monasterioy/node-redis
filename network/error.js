import response from './response.js';

const errors = (req, res, err, next) => {
    console.log("pasas por aqui")
    const message = err.message || 'Internal server error';
    const status = err.statusCode || 500;
    response.responseError(req, res, message, status)
}

export default errors
