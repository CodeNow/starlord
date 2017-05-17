'use strict'

const joi = require('joi')
const Promise = require('bluebird')
const vault = require('../vault')
const rabbitmq = require('../rabbitmq')

module.exports.jobSchema = joi.object({
  orgId: joi.number().required(),
  userId: joi.number().required(),
  privateKey: joi.string().required()
}).unknown().required()

module.exports.task = Promise.method((job) => {
  return vault.secure(job.orgId, `ssh-keys/${job.userId}`, job.privateKey)
    .then(() => {
      return rabbitmq.emitPrivateKeySecured({
        orgId: job.orgId,
        userId: job.userId
      })
    })
})
