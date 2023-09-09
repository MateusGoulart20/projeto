'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('nota_fiscal', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      valor:{
        type: Sequelize.REAL ,
        allowNull: false,
      },
      cnpj_fornecedor:{
        type: Sequelize.TEXT,
        allowNull: false,
      } 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('nota_fiscal');
  }
};
