var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var Config = require('keycloak-auth-utils').Config
var path = require('path')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  KC_CONFIG: JSON.stringify(new Config(path.join(__dirname, 'keycloak.dev.json')))
})
