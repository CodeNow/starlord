const Vault = require('node-vault')

module.exports = Vault({
  apiVersion: 'v1',
  endpoint: process.env.VAULT_ENDPOINT,
  token: process.env.VAULT_TOKEN
})
