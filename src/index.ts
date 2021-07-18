import { createConnection } from 'typeorm'

import app from './app'
import ormConfig from './utils/secrets'

createConnection({ ...ormConfig })
  .then(() => console.log('connected to pg'))
  .catch((e) => console.log(e))

const port = process.env.PORT || 5000

app.listen(port)

