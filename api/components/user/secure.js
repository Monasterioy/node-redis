import auth from '../../../auth/index.js'
import response from '../../../network/response.js'



const checkAuth = (action) => {
    const middleware = (req, res, next ) =>{
        try {   
            switch (action) {
                case 'update':
                    const { body: { id: owner} } = req
                    auth.check.own(req, owner)
                    next();
                    break;
            
                default:
                    next();
            }
        } catch (error) {
            response.responseError(req, res, error.message, error.status)
        }
    }
    return middleware
} 

export default {
    checkAuth
}