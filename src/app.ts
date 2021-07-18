import express from 'express'
import compression from 'compression'
import cors from 'cors'
import { ENVIRONMENT } from './utils/secrets'
import passport from 'passport'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import responseHandler from './middlewares/responseHandler'
import { local, jwt } from './passport/config'

import userRouter from './routers/user'
import loginRouter from './routers/login'
import serviceRouter from './routers/service'
import emailRouter from './routers/email'

const app = express()
console.log('APP IS IN ENVIRONMENT ', ENVIRONMENT)

// express configuration
app.set('port', process.env.PORT || 5000)

app.use(express.json())

// use common 3rd-party middleware
app.use(cors())
app.use(compression())
// passport
app.use(passport.initialize())
passport.use(local)
passport.use(jwt)

app.use(responseHandler)

// routers
app.use('/user', userRouter)
app.use('/', loginRouter)
app.use('/services', serviceRouter)
app.use('/email', emailRouter)

// custom API error handler
app.use(apiErrorHandler)
app.use(apiContentType)

export default app