const fastifyPlugin = require('fastify-plugin');
const fastifyMongo = require('@fastify/mongodb');

async function datasource(fastify, _) {
    fastify.register(fastifyMongo, {
        url: 'mongodb://172.17.192.1:27017/testdb'
    });
}

module.exports = fastifyPlugin(datasource);