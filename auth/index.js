import jwt, { verify } from 'jsonwebtoken'
import config from '../config.js'
import errorParser from '../utils/error.utils.js'

const sing = (data) =>{
    const token = jwt.sign(data, config.api.jwtSecret)
    return token
}

const verifyToken = (token) => {
    const data = jwt.verify(token, config.api.jwtSecret)
    return data
}

const check = {
    own: (req, own) =>{
        const decode = decodeHeader(req)
        const { id } = decode
        if(id !== own){
            throw errorParser("token invalid", 401);
        }

    }
}

const getToken = (auth) => {
    if(!auth) throw errorParser("token is invalid", 403);
    if(auth.indexOf('Bearer ') === -1) throw errorParser("token invalid", 401);
    let token = auth.replace('Bearer ', '');
    return token
} 

const decodeHeader = (req) => {
    const {headers: { authorization }} = req
    const token = getToken(authorization || '');
    const decode = verifyToken(token)
    req.user = decode
    return decode
}

export default {
    sing,
    check
}