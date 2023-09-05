'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('aluno', {
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
      sexo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      curso: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cursaEnsionSuperior: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      estagiando: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('aluno');
    
  }
};
