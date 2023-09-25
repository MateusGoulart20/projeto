const { Sequelize, DataTypes } = require('sequelize'); // importacoes
const configDatabase = require('./config/config'); // configurações de banco dados
//const database = new Sequelize(process.env.DATABASE_URL); // conexão
const database = new Sequelize(configDatabase); // conexão
 
// Chamada de Tabelas
const { UsuarioModel } = require('../models/usuario-model');
const { EscolaModel } = require('../models/escola-model');
const { DepartamentoModel } = require('../models/departamento-model');
const { EventoModel } = require('../models/evento-model');
const { FuncionarioModel } = require('../models/funcionario-model');

// Inicializar Tabelas
UsuarioModel.init(database);
EscolaModel.init(database);
DepartamentoModel.init(database);
EventoModel.init(database);
FuncionarioModel.init(database);
//AlunoModel.init(database);

// Relacionamento de tabelas
EscolaModel.associate(database.models);
DepartamentoModel.associate(database.models);
EventoModel.associate(database.models);
FuncionarioModel.associate(database.models);
//AlunoModel.associate(database.models);


// utilizado para exporta a conexão criada
///module.exports = { database };
module.exports = database;