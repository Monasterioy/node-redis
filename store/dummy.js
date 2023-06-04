const db = {
    user:[
        {id: "1", name: 'Jose'}
    ]
}

const list =  async (tabla) =>{
    if(!db[tabla]){
        db[tabla] = [];
    }
    return db[tabla]
}

const get = async (tabla, id) => {
    let col = await list(tabla)
    return col.filter(item => item?.id  === id)[0] || null;
}

const upsert = async (tabla, data) =>{
    if(!db[tabla]){
        db[tabla] = [];
    }
    db[tabla].push(data)
}

const remove = async (tabla, id) => {
    let col = await list(tabla)
    const newTabla = col.filter(item => item?.id  !== id)
    return db[newTabla]
}

const query = async (tabla, query ) => {
    let col = await list(tabla)
    const keys = Object.keys(query)[0];
    const data = col.filter(item => item[keys]  === query[keys])[0] || null;
    return data;
}

export default {
    list,
    get,
    upsert,
    remove, 
    query
}