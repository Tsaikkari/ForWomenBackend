import passportLocal from 'passport-local'
import bcrypt from 'bcryptjs'
import passportJWT, { ExtractJwt } from 'passport-jwt'

import User from '../entities/User.postgres'
 
const LocalStrategy = passportLocal.Strategy
const JWTStrategy = passportJWT.Strategy

export const local = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email: string, password: string, done: any) => {
    try {
      const user = await User.findOne({
        where: { email: email },
        relations: ['group', 'group.members', 'orders', 'orders.services'],
      })

      if (!user) {
        return done(null, false, { message: `Email ${email} not found` })
      }

      const match = await bcrypt.compare(password, user.password)

      if (!match) {
        return done(null, false, { message: 'Invalid email or password' })
      }

      return done(null, user)
    } catch (error) {
      console.log('error', error)
    }
  }
)
export const jwt = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (jwtPayload, done) => {
    const { id, role } = jwtPayload

    if (role === 'customer') {
      const user = await User.findOne(id, {
        relations: ['group', 'group.members', 'orders', 'orders.services'],
      })
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    }
    if (role !== 'customer') {
      const user = await User.findOne(id, {
        relations: ['group', 'group.members']
      })
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    }
  }
)