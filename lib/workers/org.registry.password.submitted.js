'use strict'

const joi = require('joi')
const logger = require('../logger')
const Promise = require('bluebird')
const vault = require('../vault')

module.exports.jobSchema = joi.object({
  orgId: joi.string().required(),
  password: joi.string().required()
}).unknown().required()

module.exports.task = Promise.method((job) => {
  const log = logger.child({module: 'org.registry.password.submitted', job })
  log.trace('called')
  return vault.secure(job.orgId, 'registry/password', job.password)
})
