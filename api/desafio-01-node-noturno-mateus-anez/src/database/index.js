const { Sequelize } = require('sequelize');
const configDatabase = require('./config');
const database = new Sequelize(configDatabase);

/*
database.authenticate()
    .then(() => console.log('Conectou!'))
    .catch((error) => console.log('Erro na conexão:', error));
//*/

const { NotaFiscalModel } = require('../model/nota-fiscal-model');
NotaFiscalModel.init(database);
module.exports = database;