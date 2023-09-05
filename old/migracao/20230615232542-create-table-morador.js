'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('morador', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cep: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      logradouro: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      complemento: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      bairro: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      localidade: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      uf: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ibge: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ddd: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      siafi: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('morador');
    
  }
};