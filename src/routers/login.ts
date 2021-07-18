import express from 'express'

import { userLogin, getUser } from '../controllers/login'
import tokenVerify from '../middlewares/tokenVerify'

const router = express.Router()

router.get('/user', tokenVerify, getUser)
router.post('/login', userLogin)

export default router