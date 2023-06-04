import mysql from 'mysql'
import config from '../config.js';
import { nanoid } from 'nanoid'

let connection;
/*
    la DB utilizada en esta prueba fue creada en db4free.net, el cual permite crear DB Mysql para pruebas en desarrollo
*/


const handleConnection = () =>{
    connection = mysql.createConnection({
        host: config.mysql.host,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
    })

    connection.connect((err)=>{
        if(err){
            console.log('[db error]', err)
            setTimeout(handleConnection, 5000)  
        }else {
            console.log("db connected")
        }
        
    })

    connection.on('error', ()=>{
        console.log('[db error]', err)
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleConnection();
        }else{
            throw err
        }
    })
}

handleConnection();


const  list = (table)=> {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function insert(table, data) {
    data.id = nanoid()
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function upsert(table, data) {
    if (data && data.id) {
        return update(table, data);
    } else {
        return insert(table, data);
    }
}

function query(table, query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}

export default {
    list,
    get,
    upsert,
    query
}