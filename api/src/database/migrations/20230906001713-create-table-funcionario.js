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
    await queryInterface.createTable('funcionario', {
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
      CPF:{
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cargo:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      grau_academico:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      carga_horaria:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      data_ingresso:{
        type: Sequelize.DATE,
        allowNull: false
      },
      data_egresso:{
        type: Sequelize.DATE,
        allowNull: true
      },
      departamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'departamento', key: 'id'}
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('funcionario');
  }
};
