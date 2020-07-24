const ICrud = require('./../interfaces/interfaceCrud');
const Sequelize = require('sequelize');
const { where } = require('sequelize');

class Postgres extends ICrud {
    constructor(connection, schema) {
        super();
        this._connection = connection,
        this._schema = schema
    }

    async isConnected() {
        try {   
            await this._connection.authenticate();
            return true;
        } catch(err) {
            console.log('Postgres conection fail: ', err);
            return false;
        }
    }

    async create(item) {
        const { dataValues } = await this._schema.create(item);

        return dataValues;
    }

    async read(item = {}) {
        const result = this._schema.findAll({where: item, raw: true});

        return result;
    }

    async update(id, item) {
        const result = await this._schema.update(item, {where: {id: id}});

        return result;
    }

    async delete(id) {
        const query = id ? { id }: {}
        return this._schema.destroy({where: query});
    }

    static async model(connection, schema) {
        const model = connection.define(schema.name, schema.schema, schema.options); 
        await model.sync();
        return model;
    }

    static async connect() {
        const connection = new Sequelize(
            'db_heros',
            'root',
            'toor',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false,
                loggin: false
            }
        ) 
        
        return connection;
    }
}

module.exports = Postgres;