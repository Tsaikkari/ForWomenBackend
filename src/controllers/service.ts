import { Request, Response, NextFunction } from 'express'

import {
  NotFoundError,
  UnauthorizedError,
  InternalServerError,
  BadRequestError,
} from '../helpers/apiError'
import Service from '../entities/Service.postgres'

// TODO: only for admin
export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const service = req.body
    const newService = Service.create({ ...service })
    const savedService = await Service.save(newService)

    res.deliver(200, 'Success', savedService)
  } catch (error) {
    next(new InternalServerError(error.message))
  }
}

export const getServices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const services = await Service.find({ relations: ['orders'] })
    res.deliver(200, 'Success', services)
  } catch (error) {
    next(new NotFoundError('Services not found'))
  }
}

// TODO: update service and delete service
