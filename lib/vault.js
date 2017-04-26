const Vault = require("node-vault")

const vault = Vault({
  apiVersion: 'v1',
  endpoint: process.env.VAULT_ENDPOINT,
  token: process.env.VAULT_TOKEN
})

module.exports = {
  secure: function (org, key, value) {
    return vault.write(`secret/organization/${org}/${key}`, { value: value, lease: '1d' })
  }
}
