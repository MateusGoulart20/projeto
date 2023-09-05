'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('nota_fiscal', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            cnpjFornecedor: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            data: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            valor: {
                type: Sequelize.FLOAT,
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('nota_fiscal');
    }
};
