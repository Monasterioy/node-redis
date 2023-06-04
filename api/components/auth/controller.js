import signToken from '../../../auth/index.js'
import bcrypt from 'bcrypt'
const table = 'auth';
import errorParser from '../../../utils/error.utils.js';

export default (injectedStore) => {

    const store = injectedStore || require('../../../store/dummy')
    const upsert = async (body) => {
        const { username, id, password } = body
        let authData ={
            username:username,
        }
        if (id) authData.id = id
        if (password ) authData.password =  await bcrypt.hash(password, 2)
        return store.upsert(table, authData)
    }

    const login =  async(body) => {
        const { username, password} = body
        const data = await store.query(table, {username: username})   
        if(!data) throw errorParser("data not fount", 404);
        const match = await bcrypt.compare(password, data?.password)
        if(!match) throw errorParser("data invalid", 404);
        const token = signToken.sing(data)
        return token
    }

    return {
        upsert,
        login 
    }
}
