'use strict'

require('dotenv').config({ path: './config/.env' })

const Promise = require('bluebird')
const sinon = require('sinon')
const vault = require('../../../lib/vault')
const rabbitmq = require('../../../lib/rabbitmq')
const worker = require('../../../lib/workers/org.user.private-key.created')

require('sinon-as-promised')(Promise)

describe('Unit: org.user.private-key.created', () => {
  const orgId = Math.floor(Math.random() * 100000)
  const userId = Math.floor(Math.random() * 100000)
  const privateKey = `privateKey` + Math.floor(Math.random() * 100000)
  beforeEach((done) => {
    sinon.stub(vault, 'secure').resolves()
    sinon.stub(rabbitmq, 'emitPrivateKeySecured')
    done()
  })
  afterEach((done) => {
    vault.secure.restore()
    rabbitmq.emitPrivateKeySecured.restore()
    done()
  })
  it('should submit private key to vault', () => {
    return worker.task({
      orgId,
      userId,
      privateKey
    })
      .then(() => {
        sinon.assert.calledOnce(vault.secure)
        sinon.assert.calledWithExactly(vault.secure, orgId, `ssh-keys/${userId}`, privateKey)
      })
  })
  it('should emit a secured event to rabbitmq', () => {
    return worker.task({
      orgId,
      userId,
      privateKey
    })
      .then(() => {
        sinon.assert.calledOnce(rabbitmq.emitPrivateKeySecured)
        sinon.assert.calledWithExactly(rabbitmq.emitPrivateKeySecured, {
          orgId,
          userId
        })
      })
  })
})
