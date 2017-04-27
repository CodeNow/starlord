'use strict'

require('dotenv').config({ path: './config/.env' })

const Promise = require('bluebird')
const sinon = require('sinon')
const vault = require('../../../lib/vault')
const worker = require('../../../lib/workers/org.registry.password.submitted')

require('sinon-as-promised')(Promise)

describe('Unit: org.registry.password.submitted', () => {
  const orgId = `testOrg` + Math.floor(Math.random() * 100000)
  const password = `password` + Math.floor(Math.random() * 100000)
  beforeEach((done) => {
    sinon.stub(vault, 'secure').resolves()
    done()
  })
  afterEach((done) => {
    vault.secure.restore()
    done()
  })
  it('should submit password to vault', () => {
    return worker.task({
      orgId,
      password
    })
      .then(() => {
        sinon.assert.calledOnce(vault.secure)
        sinon.assert.calledWithExactly(vault.secure, orgId, 'registry/password', password)
      })
  })
})
