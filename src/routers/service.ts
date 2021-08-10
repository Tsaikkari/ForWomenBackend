import express from 'express'

import { getServices, createService } from '../controllers/service'
import tokenVerify from '../middlewares/tokenVerify'
import rootAccount from '../middlewares/rootAccount'
//import admin from'../middlewares/admin'

const router = express.Router()

router.post('/', createService)
router.get('/', getServices)

export default router