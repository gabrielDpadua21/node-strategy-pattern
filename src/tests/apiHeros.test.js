const assert = require('assert');
const api = require('./../api');

describe('Test suit api heros', function() {
    this.beforeAll(async () => {
        app = await api;
    });

    it('List all /heros', async() => {
        const result = await app.inject({
            method: 'GET',
            url: '/heros'
        });

        const statusCode = result.statusCode;
    })
})