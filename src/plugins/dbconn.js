const fastifyPlugin = require('fastify-plugin');
const fastifyMongo = require('@fastify/mongodb');

async function dbconn (fastify, options) {
    fastify.register(fastifyMongo, {
        url: 'mongodb://172.17.192.1:27017/testdb'
    });
}

module.exports = fastifyPlugin(dbconn);