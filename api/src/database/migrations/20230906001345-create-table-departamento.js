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
  await queryInterface.createTable('departamento', {
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
      sala:{
        type: Sequelize.TEXT,
        allowNull: false,
      },
      escola: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'escola', key: 'id'}
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('departamento');
  }
};
