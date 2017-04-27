const Vault = require('node-vault')

class VaultManager {
  constructor () {
    this._vault = Vault({
      apiVersion: 'v1',
      endpoint: process.env.VAULT_ENDPOINT,
      token: process.env.VAULT_TOKEN
    })
  }

  secure (org, key, value) {
    return this._vault.write(`secret/organization/${org}/${key}`, { value, lease: '1d' })
  }
}

module.exports = new VaultManager()
