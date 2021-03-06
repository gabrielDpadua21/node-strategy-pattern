const assert = require('assert');
const Postgres = require('../db/strategies/postgres');
const Context = require('../db/strategies/base/contextStrategy');


const context = new Context(new Postgres());

const MOCK_HERO_INSERT = {name: 'Green Arrow', power: 'Arrows'};

const MOCK_HERO_UPDATE = {name: 'Spider Man', power: 'Spider'};

describe('Postgres Strategy', function () {
    this.timeout(Infinity);

    this.beforeAll(async() => {
        context.connect();
        await context.delete();
        await context.create(MOCK_HERO_UPDATE);
    })

    it('PostgresSQL Connection', async() => {
        const result = await context.isConnected();
        assert.equal(result, true);
    });

    it('Postgres insert', async() => {
        const result = await context.create(MOCK_HERO_INSERT);
        delete result.id;
        assert.deepEqual(result, MOCK_HERO_INSERT);
    })

    it('Postgres select', async() => {
        const [result] = await context.read({name: MOCK_HERO_INSERT.name});
        delete result.id;
        assert.deepEqual(result, MOCK_HERO_INSERT);
    })

    it('Postgres update', async() => {
        const [itemUpdate] = await context.read({name: MOCK_HERO_UPDATE.name});
        // REST/SPREAD
        const updateHero = {
            ...MOCK_HERO_UPDATE,
            power: 'Spider Sense'
        }

        const [result] = await context.update(itemUpdate.id, updateHero);
        const [item] = await context.read({id: itemUpdate.id});

        assert.deepEqual(result, 1);
        assert.deepEqual(updateHero.power, item.power);
    })

    it('Postgres delete', async() => {
        const [item] = await context.read({});
        const result = await context.delete(item.id);
        assert.deepEqual(result, 1);
    })
})