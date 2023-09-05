const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

const { MerendeiraModel } = require('../models/merendeira-model');
const { NutricionistaModel } = require('../models/nutricionista-model');
const { NotaFiscalModel } = require('../models/nota-fiscal-mode');

const database = new Sequelize(configDatabase);

MerendeiraModel.init(database);
NutricionistaModel.init(database);
NotaFiscalModel.init(database);

module.exports = database;
