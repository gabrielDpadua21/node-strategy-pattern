const Sequelize = require('sequelize');

const HeroSchema = {
    name: 'heros',
    schema: {
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
    },

    options: {
        tableName: 'tb_heros',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = HeroSchema;