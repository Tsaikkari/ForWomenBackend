import { Request, Response, NextFunction } from 'express'

import { NotFoundError, UnauthorizedError } from '../helpers/apiError'
import User from '../entities/User.postgres'

export const rootAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User
  if (!user) {
    return next(new NotFoundError('User not found'))
  }
  if (user.role !== 'customer') {
    return next(new UnauthorizedError('Not a root account'))
  }
  return next()
}

export default rootAccount
