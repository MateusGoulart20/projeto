'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('candidato', {
      idCandidato: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idEstado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'estado', key: 'idEstado' },
      },
      idCargo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'cargo', key: 'idCargo' },
      },
      nome: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('candidato');
  }
};
