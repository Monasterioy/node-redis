import express from 'express';
import response  from '../../../network/response.js'
import secure from './secure.js';
const router  = express.Router();

import controller from'./index.js'

const list = async (req, res)=>{
   try {
      const data = await controller.list()
      response.responseSuccess(req, res, data, 200) 
   } catch (error) {
      response.responseError(req, res, error.message, 500) 
   }
   
}

const get = async (req, res)=>{
   try {
      const {id} = req.params
      const data = await controller.get(id)
      response.responseSuccess(req, res, data, 200)
      
   } catch (error) {
      response.responseError(req, res, error.message, 500)
   }
}

const upsert = async (req, res) =>{
   try {
      const body = req.body
      const data = await controller.upsert(body)
      response.responseSuccess(req, res, data, 200)
   } catch (error) {
      response.responseError(req, res, error.message, error.status)
   }
}

const remove = async (req, res)=>{
   try {
      const { id } = req.params
      const data = await controller.delete(id)
      response.responseSuccess(req, res, data, 200)
   } catch (error) {
      response.responseError(req, res, error.message, error.status)
   }

} 

router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.patch('/', secure.checkAuth('update'), upsert)
router.delete('/:id', remove)


export default router