'use strict'

require('dotenv').config({ path: './config/.env' })

const log = require('./lib/logger')
const workerServer = require('./lib/worker')
const rabbitmq = require('./lib/rabbitmq')

rabbitmq.connect()
  .then(workerServer.start.bind(workerServer))
  .then(() => {
    log.info('all components started')
  })
  .catch((error) => {
    log.fatal({ error }, 'Starlord failed to start, our galaxy is doomed')
    process.exit(1)
  })
