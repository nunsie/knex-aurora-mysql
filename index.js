const Bluebird = require('bluebird');
const MySqlClient = require('knex/lib/dialects/mysql');
const dataApi = require('knex-aurora-data-api-client/src/data-api');
const constants = require('knex-aurora-data-api-client/src/constants');

// Call mysql client to setup knex, this set as this function
const client = MySqlClient.constructor
  ? class MysqlClientRDSDataAPI extends MySqlClient {}
  : function MysqlClientRDSDataAPI(config) {
      MySqlClient.call(this, config);
    };

Object.assign(client.prototype, {
  acquireConnection() {
    const connection = this._driver(this.connectionSettings);
    return Bluebird.resolve(connection);
  },
});

dataApi(client, MySqlClient, constants.dialects.mysql);

module.exports = client;
