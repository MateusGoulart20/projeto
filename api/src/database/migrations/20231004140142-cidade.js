'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cidade', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      estado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'estado', key: 'id'}
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cidade');
  }
};
