const ICrud = require('./interfaces/interfaceCrud');
const Sequelize = require('sequelize');
const { where } = require('sequelize');

class Postgres extends ICrud {
    constructor() {
        super();
        this._driver = null,
        this._heros = null
    }

    async isConnected() {
        try {   
            await this._driver.authenticate();
            return true;
        } catch(err) {
            console.log('Postgres conection fail: ', err);
            return false;
        }
    }

    async create(item) {
        const { dataValues } = await this._heros.create(item);

        return dataValues;
    }

    async read(item = {}) {
        const result = this._heros.findAll({where: item, raw: true});

        return result;
    }

    async update(id, item) {
        const result = await this._heros.update(item, {where: {id: id}});

        return result;
    }

    async delete(id) {
        const query = id ? { id }: {}
        return this._heros.destroy({where: query});
    }

    async model() {
        this._heros = this._driver.define('heros', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                require: true
            },
            power: {
                type: Sequelize.STRING,
                require: true
            } 
        }, {
            tableName: 'tb_heros',
            freezeTableName: false,
            timestamps: false
        });

        await this._heros.sync();
    }

    async connect() {
        this._driver = new Sequelize(
            'db_heros',
            'root',
            'toor',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        ) 
        
        await this.model();
    }
}

module.exports = Postgres;