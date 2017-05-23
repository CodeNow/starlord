'use strict'

const joi = require('joi')
const Promise = require('bluebird')
const vault = require('../vault')

module.exports.jobSchema = joi.object({
  orgId: joi.number().required(),
  password: joi.string().required()
}).unknown().required()

module.exports.task = Promise.method((job) => {
  return vault.secure(String(job.orgId), 'registry/password', job.password)
})
