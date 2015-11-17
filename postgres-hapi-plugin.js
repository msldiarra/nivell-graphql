import pg from 'pg';
import {DB_CONNECTION} from './config';

async function openConnection(request, reply) {

    try {
        request.client = new pg.Client(DB_CONNECTION);
        request.client.connect();
        reply.continue();

    } catch (error) {

        console.log(error);
        reply(error);
    }
}

async function closeConnection(request) {

    if (request.client) {
        await request.client.end();
    }
}

function register(server, options, next) {

    server.ext('onRequest', openConnection);
    server.on('tail', closeConnection);
    next();
}

register.attributes = {
    name: 'PostgresHapiPlugin'
};

const PostgresHapiPlugin = {register};
export default PostgresHapiPlugin;