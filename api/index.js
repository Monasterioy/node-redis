import express from 'express'
import swaggerUi from 'swagger-ui-express';
import user from './components/user/network.js'
import auth from './components/auth/network.js'
import config from '../config.js';
import fs from 'fs'
import errors from '../network/error.js';
const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
const swaggerDoc = loadJSON( './swagger.json');
const app  = express();
app.use(express.json())


//Routers
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use(errors)

app.listen(config.api.port, ()=>{
    console.log(`SERVER LISTEN IN PORT ${config.api.port}`)
})