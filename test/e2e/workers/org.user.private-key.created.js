'use strict'

require('dotenv').config({ path: './config/.env' })

const expect = require('chai').expect
const Promise = require('bluebird')
const rabbitmq = require('../../helpers/rabbitmq')
const vault = require('../../helpers/vault')

require('sinon-as-promised')(Promise)

describe('E2E: org.user.private-key.created', () => {
  const orgId = Math.floor(Math.random() * 100000)
  const userId = Math.floor(Math.random() * 100000)
  const privateKey = `privateKey` + Math.floor(Math.random() * 100000)
  it('should submit private key to vault', () => {
    const waitForReadFromVault = () => {
      return Promise.delay(100)
        .then(() => vault.read(`/secret/organization/${orgId}/ssh-keys/${userId}`))
        .catch((err) => {
          if (err.status === 404) {
            return waitForReadFromVault()
          }
          throw err
        })
    }
    return rabbitmq.publishEvent('org.user.private-key.created', {
      orgId: orgId,
      userId: userId,
      privateKey: privateKey
    })
      .then(waitForReadFromVault)
      .then((privateKey) => {
        expect(privateKey).to.equal(privateKey)
      })
  })
})
