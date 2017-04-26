'use strict'

require('dotenv').config({ path: './config/.env' })

const expect = require('chai').expect
const Promise = require('bluebird')
const rabbitmq = require('../rabbitmq')
const vault = require('../vault')

require('sinon-as-promised')(Promise)

describe('E2E: org.registry.password.submitted', () => {
  const orgId = `testOrg` + Math.floor(Math.random() * 100000)
  const password = `password` + Math.floor(Math.random() * 100000)
  it('should submit password to vault', () => {
    const waitForReadFromVault = () => {
      return Promise.delay(100)
        .then(() => vault.read(`/secret/organization/${orgId}/registry/password`))
        .catch((err) => {
          if (err.status === 404) {
            console.log('404')
            return waitForReadFromVault()
          }
          console.log(Object.keys(err))
          throw err
        })
    }
    return rabbitmq.publishEvent('org.registry.password.submitted', {
      orgId: orgId,
      password: password
    })
      .then(waitForReadFromVault)
      .then((password) => {
        expect(password).to.equal(password)
      })
  })
})