'use strict'

require('dotenv').config({ path: './config/.env' })

const Promise = require('bluebird')
const sinon = require('sinon')
const vault = require('../../lib/vault')

require('sinon-as-promised')(Promise)

describe('Unit: vault', () => {
  describe('secure', () => {
    const orgId = `testOrg` + Math.floor(Math.random() * 100000)
    const password = `password` + Math.floor(Math.random() * 100000)
    const key = '/my/key'
    beforeEach((done) => {
      sinon.stub(vault._vault, 'write').resolves()
      done()
    })
    afterEach((done) => {
      vault._vault.write.restore()
      done()
    })
    it('should write data in secure location', () => {
      return vault.secure(orgId, key, password)
        .then(() => {
          sinon.assert.calledOnce(vault._vault.write)
          sinon.assert.calledWithExactly(
            vault._vault.write,
            `secret/organization/${orgId}/${key}`,
            { value: password, lease: '1d' })
        })
    })
  })
})
