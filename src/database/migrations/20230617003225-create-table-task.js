'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('task', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      responsavel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' },
      },
      titulo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      vencimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.TEXT,
        allowNull: false,
      }

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('task');

  }
};