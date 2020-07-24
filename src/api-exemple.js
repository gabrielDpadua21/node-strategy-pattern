'use strict';

const Hapi = require('hapi');
const Postgres = require('./db/strategies/postgres/postgres');
const HeroSchema = require('./db/strategies/postgres/schemas/herosSchemas');
const Context = require('./db/strategies/base/contextStrategy');


const server = new Hapi.Server({
    port: 3000
});

async function main() {

    const connection = await Postgres.connect();
    const model = await Postgres.model(connection, HeroSchema);
    const context = new Context(new Postgres(connection, model));

    server.route([
        {
            path: '/heros',
            method: 'GET',
            handler: (request, head) => {
                return context.read();
            }
        }
    ])

    await server.start();
    console.log(`Server running at: ${server.info.port}`)
}

main()
