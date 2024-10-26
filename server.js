const fastify = require('fastify')({ logger: true });
const path = require('path');

// Parse JSON body
fastify.register(require('@fastify/formbody'));

// Create an object to store data based on keys
let dataStore = {};

// Root route for GET
fastify.get('/', (request, reply) => {
  reply.send({ message: 'Welcome to the Fastify server!' });
});

// POST route for receiving data
fastify.post('/:dataKey', (request, reply) => {
  const dataKey = request.params.dataKey;
  dataStore[dataKey] = request.body;
  reply.status(200).send({ status: 'success', message: 'Data received', data: dataStore[dataKey] });
});

// GET route for sending data
fastify.get('/:dataKey', (request, reply) => {
  const dataKey = request.params.dataKey;
  
  if (dataStore[dataKey]) {
    reply.status(200).send(dataStore[dataKey]);
  } else {
    reply.status(404).send({ status: 'error', message: 'Data not found' });
  }
});

// Start server
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address}`);
});
