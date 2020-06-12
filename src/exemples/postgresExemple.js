const Sequelize = require('sequelize');

const driver = new Sequelize(
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

async function main() {
    const Heros = driver.define('heros', {
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
    })

    await Heros.sync();

    await Heros.create({
        name: 'Green Lantern',
        power: 'Ring'
    })

    const result = await Heros.findAll({ raw: true, attributes: ['name']});

    console.log('result: ', result);
}

main()