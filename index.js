const knexDataApiClient = require('knex-aurora-data-api-client');
const Bluebird = require('bluebird');

Object.assign(knexDataApiClient.mysql.prototype, {
  acquireConnection() {
    const connection = this._driver(this.connectionSettings);
    return Bluebird.resolve(connection);
  },
});

module.exports = knexDataApiClient.mysql;
