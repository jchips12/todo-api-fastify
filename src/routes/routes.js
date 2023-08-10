const {ObjectId} = require("@fastify/mongodb");

async function routes(fastify, options) {
    fastify.get('/api/tasks', async (request, reply) => {
        const collection = fastify.mongo.db.collection('tasks');
        const result = await collection.find().toArray();

        // Send data back to client
        return reply.status(200).send(result);
    });

    fastify.get('/api/tasks/:id', async (request, reply) => {
        const collection = fastify.mongo.db.collection('tasks');
        const {id} = request.params;
        const result = await collection.findOne(new ObjectId(id));

        if (!result) {
            return reply.code(404).send({error: 'Task with the given id was not found'});
        }

        return reply.status(200).send(result);
    });


    fastify.put('/api/tasks/:id', async (request, reply) => {
        const collection = fastify.mongo.db.collection('tasks');
        const {id} = request.params;
        const {todo, doing, done} = request.body;
        const result = await collection.updateOne(
            {_id: new ObjectId(id)},
            {
                $set: {
                    "todo.list": todo.list,
                    "doing.list": doing.list,
                    "done.list": done.list,
                },
            },
        );

        if (!result.modifiedCount) {
            return reply.code(200).send({error: 'no change'});
        }

        return reply.status(200).send({status: 'success'});
    });
}

module.exports = routes;