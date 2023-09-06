'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('evento', {
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
      comeco_evento:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      fim_evento:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      local:{
        type: Sequelize.TEXT,
        allowNull: false,
      },
      departamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'departamento', key: 'id'}
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('evento');
  }
};
