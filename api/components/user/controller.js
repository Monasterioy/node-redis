import { nanoid } from 'nanoid'
import auth from '../auth/index.js'

const table = 'user';



export default (injectedStore) => {

    const store = injectedStore || require('../../../store/dummy.js')
    
    const list = () =>{
        return store.list(table)
    }

    const get = (id) => {
        return store.get(table, id)
    }
    
    const upsert =async  (body) => {
        const { name, username, id, password } = body
        let user ={
            name,
        }

        if(id) user.id = id
        if(password) user.password = password
        if(username) user.username = username

        if(username || password) {
            await auth.upsert({
                id,
                username, 
                password
            })
        }
        
        delete user.password

        return store.upsert(table, user)
    }

    const remove = (id) => {
        return store.remove(table, id)
    }
    
    return {
        list,
        get,
        upsert, 
        remove
    }
}
