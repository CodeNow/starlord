'use strict'

const log = require('./logger')
const RabbitMQClient = require('ponos/lib/rabbitmq')
const Joi = require('joi')

const schemas = {
  emitPrivateKeySecured: Joi.object({
    orgId: Joi.number().required(),
    userId: Joi.number().required()
  }).required()
}

class RabbitMQ extends RabbitMQClient {
  constructor () {
    super({
      name: process.env.APP_NAME,
      log,
      events: [{
        name: 'org.user.private-key.secured',
        jobSchema: schemas.emitPrivateKeySecured
      }]
    })
  }

  emitPrivateKeySecured (job) {
    this.publishEvent('org.user.private-key.secured', job)
  }
}

module.exports = new RabbitMQ()
