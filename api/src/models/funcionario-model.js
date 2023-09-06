const { Model, DataTypes } = require("sequelize");

class FuncionarioModel extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.TEXT,
            CPF: DataTypes.TEXT,
            cargo: DataTypes.TEXT,
            grau_academico: DataTypes.TEXT,
            carga_horaria: DataTypes.INTEGER,
            data_ingresso: DataTypes.DATE,
            data_egresso: DataTypes.DATE,
            departamento: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'funcionario',
            modelName: 'FuncionarioModel',
            timestamps: false
        });
    }

    static associate(models) {
        this.belongsTo(models.DepartamentoModel, { foreignKey: 'departamento' });
    }
}

module.exports = { FuncionarioModel };
