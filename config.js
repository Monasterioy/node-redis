export default {
    api:{
        jwtSecret: process.env.jwtSecret || 'hola mundo',
        port: process.env.API_PORT || 3000 
    }, 
    mysql:{
        host:  process.env.MYSQL_HOST || 'db4free.net',
        user:  process.env.MYSQL_USER || 'josemonasterio',
        password: process.env.MYSQL_PASSWORD || 'TestMonas',
        database: process.env.MYSQL_DB || 'noderedis'
    }
    
}