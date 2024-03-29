const Publisher = require('ponos/lib/rabbitmq')
const log = require('../../lib/logger')
const Promise = require('bluebird')

const getConnection = () => {
  const publisher = new Publisher({
    name: process.env.APP_NAME,
    log: log,
    hostname: process.env.RABBITMQ_HOSTNAME,
    port: process.env.RABBITMQ_PORT,
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD,
    events: [{
      name: 'org.registry.password.submitted',
      jobSchema: require('../../lib/workers/org.registry.password.submitted').jobSchema
    }, {
      name: 'org.user.private-key.created',
      jobSchema: require('../../lib/workers/org.user.private-key.created').jobSchema
    }]
  })

  return publisher.connect()
    .return(publisher)
    .disposer((connection) => {
      return connection.disconnect()
    })
}

module.exports = {
  publishEvent: (eventName, data) => {
    return Promise.using(getConnection(), (connection) => {
      return connection.publishEvent(eventName, data)
    })
  }
}
