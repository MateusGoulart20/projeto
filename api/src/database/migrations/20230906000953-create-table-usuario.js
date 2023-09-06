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
    await queryInterface.createTable('usuario', {
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
      CPF: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      senha:{
        type: Sequelize.TEXT,
        allowNull: false,
      },
      /*responsavel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' },
      },*/
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuario');
  }
};
