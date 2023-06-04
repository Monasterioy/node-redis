import express from 'express';
import response  from '../../../network/response.js'

const router  = express.Router();

import controller from'./index.js'


const login = async (req, res) =>{
   try {
      const body = req.body
      const token = await controller.login(body)
      response.responseSuccess(req, res, token, 200)
   } catch (error) {
      console.error(error)
      response.responseError(req, res, error.message, error.status)
   }
}

router.post('/', login)


export default router