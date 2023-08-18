const fastify = require('fastify')({logger: true});
const dbConnector = require('./plugins/datasource');
const routes = require('./routes/routes');

fastify.register(dbConnector);
fastify.register(routes);

fastify.listen({port: 8080}, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
});