import graphqlHTTP from 'express-graphql';
import express from 'express';
import schema from './schema';

console.log('Server online!');
express()
    .use('/graphql', graphqlHTTP({ schema: schema, pretty: true, graphiql: true}))
    .listen(3000);