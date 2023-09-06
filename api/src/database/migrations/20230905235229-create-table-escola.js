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
    await queryInterface.createTable('escola', {
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
      orcamento:{
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      CNPJ: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      numero_contato:{
        type: Sequelize.TEXT,
        allowNull: true,
      },
      email_contato:{
        type: Sequelize.TEXT,
        allowNull: false,
      },
      quantidade_professores: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantidade_administrativos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantidade_tercerizados: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantidade_estudantes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantidade_salas: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unidade_federativa: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      bairro: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rua: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      numero_rua: {
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
    await queryInterface.dropTable('escola');
  }
};
