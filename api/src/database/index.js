const { Sequelize, DataTypes } = require('sequelize'); // importacoes
const configDatabase = require('./config/config'); // configurações de banco dados
const database = new Sequelize(configDatabase); // conexão
 
// Chamada de Tabelas
const { UserModel } = require('../model/user-model');
const { TaskModel } = require('../model/task-model');
//const { AlunoModel } = require('../../old/model/aluno-model');

// Inicializar Tabelas
UserModel.init(database);
TaskModel.init(database);
//AlunoModel.init(database);

// Relacionamento de tabelas
UserModel.associate(database.models);
TaskModel.associate(database.models);
//AlunoModel.associate(database.models);


// utilizado para exporta a conexão criada
///module.exports = { database };
module.exports = database;