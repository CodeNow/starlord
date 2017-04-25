'use strict'

require('dotenv').config({ path: './config/.env' })

const log = require('./lib/logger').child({ module: 'main' })
const workerServer = require('./lib/worker')

return workerServer.start()
  .then(() => {
    log.info('all components started')
  })
  .catch((error) => {
    log.fatal({ error }, 'Guard failed to start')
    process.exit(1)
  })
