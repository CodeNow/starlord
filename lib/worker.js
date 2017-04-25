'use strict'

const log = require('./logger').child({ module: 'worker-server' })
const ponos = require('ponos')

const events = {
  'org.registry.password.submitted': require('./workers/org.registry.password.submitted.js')
}
const tasks = {}

module.exports = new ponos.Server({
  name: process.env.APP_NAME,
  enableErrorEvents: true,
  rabbitmq: {
    channel: {
      prefetch: process.env.STARLORD_PREFETCH
    }
  },
  log: log,
  tasks: tasks,
  events: events
})
