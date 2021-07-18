import express from 'express'

import tokenVerify from '../middlewares/tokenVerify'
import rootAccount from '../middlewares/rootAccount'
import admin from '../middlewares/admin'
import {
  registerUser,
  updateUser,
  deleteUser,
  getUsers,
  createGroup,
  addGroupMember,
  deleteGroup,
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
} from '../controllers/user'

const router = express.Router()

router.post('/root', registerUser)
router.patch('/', tokenVerify, updateUser)
router.delete('/:id', admin, tokenVerify, deleteUser)
router.get('/all', admin, getUsers)
router.post('/group', tokenVerify, rootAccount, createGroup)
router.patch('/group/:id', tokenVerify, rootAccount, addGroupMember)
router.delete('/group/:id', tokenVerify, rootAccount, deleteGroup)
router.post('/orders', tokenVerify, rootAccount, createOrder)
router.get('/orders/all', admin, tokenVerify, rootAccount, getAllOrders)
router.patch('/orders/:id', admin, tokenVerify, rootAccount, updateOrder)
router.delete('/orders/:id', admin, tokenVerify, rootAccount, deleteOrder)

export default router
