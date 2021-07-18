import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'

import {
  NotFoundError,
  UnauthorizedError,
  InternalServerError,
  BadRequestError,
} from '../helpers/apiError'
import User from '../entities/User.postgres'
import Group from '../entities/Group.postgres'
import Order from '../entities/Order.postgres'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      info,
      username,
      email,
      password,
      firstName,
      lastName,
      role,
      isAdmin,
    } = req.body
    const exists = await User.findOne({
      where: { username: username },
    })

    if (exists) {
      return next(new BadRequestError(`Username ${username} already exists`))
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const newUser = User.create({
      ...info,
      username: username,
      email: email,
      password: hashedPassword,
      firstName: firstName,
      role: role,
      isAdmin: isAdmin,
    })

    await User.save(newUser)

    res.deliver(201, 'Registered successfully')
  } catch (error) {
    next(new InternalServerError(error.message))
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const user = req.user as User
    // TODO: make DRY
    if (!user) {
      return next(new NotFoundError())
    }
    if (update.username) {
      user.username = update.username
    }
    if (update.email) {
      user.email = update.email
    }
    if (update.firstName) {
      user.firstName = update.firstName
    }
    if (update.firstName) {
      user.lastName = update.lastName
    }
    if (update.mobile) {
      user.mobile = update.mobile
    }
    if (update.image) {
      user.image = update.image
    }
    if (update.group) {
      user.group = update.group
    }

    if (update.password) {
      if (update.password.length > 30) {
        user.password != update.password
      }
      if (update.password.length < 30) {
        user.password = await bcrypt.hash(update.password, 8)
        await User.save(user)
      }
    }
    await User.save(user)

    res.deliver(200, 'Updated user', user)
  } catch (error) {
    next(new InternalServerError(error.message))
  }
}

// Admin can delete user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id)
    const exists = await User.findOne({
      where: { id: userId },
    })

    if (!exists || exists.id !== userId) {
      return next(new NotFoundError('User not found'))
    }

    await exists.remove()
    res.deliver(200, 'Removed user')
  } catch (error) {
    next(new InternalServerError())
  }
}

// Admin can get all users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({ relations: ['group'] })
    res.deliver(200, 'Successfully got users', users)
  } catch (error) {
    next(new NotFoundError('Users not found'))
  }
}

export const createGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const group = req.body
    const user = req.user as User

    if (!user) {
      return next(new NotFoundError(`User ${user} not found`))
    }

    const newGroup = User.create({
      ...user,
      group: group,
    })

    const savedGroup = await User.save(newGroup)
    res.deliver(201, 'Successfully created group', savedGroup)
  } catch (error) {
    next(new InternalServerError(error.message))
  }
}

export const addGroupMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const member = req.body
    const user = req.user as User

    const group = await Group.findOne(user.group.id)

    if (!group) {
      return next(new NotFoundError(`Group ${group} not found`))
    }

    const hashedPassword = await bcrypt.hash(member.password, 8)

    const newMember = User.create({
      ...(member as User),
      password: hashedPassword,
    })

    group.members.push(newMember)

    const updatedGroup = await Group.save(group)

    res.deliver(200, 'New group member', updatedGroup)
  } catch (error) {
    next(new InternalServerError(error.message))
  }
}

export const deleteGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupId = parseInt(req.params.id)
    const exists = await Group.findOne({
      where: { id: groupId },
    })

    if (!exists || exists.id !== groupId) {
      return next(new NotFoundError('Group not found'))
    }

    await exists.remove()
    res.deliver(200, 'Removed group')
  } catch (error) {
    next(new InternalServerError())
  }
}

// Order controllers
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = req.body
    const user = req.user as User

    if (!user) {
      return next(new NotFoundError(`User ${user} not found`))
    }

    const newOrder = Order.create({ ...order, user: user })
    const savedOrder = await Order.save(newOrder)

    res.deliver(201, 'Successfully created order', savedOrder)
  } catch (error) {
    next(new InternalServerError())
  }
}

// TODO: Admin can updateOrder
export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const user = req.user as User
    const orderId = req.body.id
    console.log('orderId', orderId)

    const order = await Order.findOne(orderId)

    if (!order || order.user.id !== user.id) {
      return next(new NotFoundError('Order is not found'))
    }

    const updatedOrder = await Order.update(order.id, update)
    res.deliver(200, 'Updated order', updatedOrder)
  } catch (error) {
    next(new InternalServerError(error.message))
  }
}

// TODO: Admin can delete orders
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.id)
    const user = req.user as User
    const order = await Order.findOne(orderId)

    if (!order || order.user.id !== user.id) {
      return next(new NotFoundError('Order is not found'))
    }

    await order.remove()
    res.deliver(200, 'Removed order')
  } catch (error) {
    next(new InternalServerError())
  }
}

// Admin can get all orders
export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find({ relations: ['user'] })
    res.deliver(200, 'Successfully got orders', orders)
  } catch (error) {
    next(new InternalServerError(error.message))
  }
}
