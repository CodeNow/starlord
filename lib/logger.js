'use strict'

const bunyan = require('bunyan')
const _ = require('lodash')
const cls = require('continuation-local-storage')

function deepSerialize (data) {
  return Object.keys(data).reduce((serializedData = {}, key) => {
    if (serializers[key]) {
      serializedData[key] = serializers[key](data[key])
    } else {
      serializedData[key] = data[key]
    }
    return serializedData
  }, {})
}

const serializers = {
  tx: function () {
    let out
    try {
      out = {
        tid: cls.getNamespace('ponos').get('tid')
      }
    } catch (e) {
      // cant do anything here
    }
    return out
  },
  job: deepSerialize,
  originalJobPayload: deepSerialize,
  data: deepSerialize,
  error: deepSerialize,
  password: function () {
    return '***SANITIZED***'
  }
}
_.defaults(serializers, bunyan.stdSerializers)

/**
 * The default logger for pheidi.
 * @type {bunyan}
 */
module.exports = bunyan.createLogger({
  name: process.env.APP_NAME,
  streams: [{ level: process.env.LOG_LEVEL, stream: process.stdout }],
  serializers,
  src: true
}).child({ tx: true })
