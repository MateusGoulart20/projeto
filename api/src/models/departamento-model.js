const { Model, DataTypes } = require("sequelize");

class DepartamentoModel extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.TEXT,
            sala: DataTypes.TEXT,
            escola: DataTypes.INTEGER,
        }, {
            sequelize,
            tableName: 'departamento',
            modelName: 'DepartamentoModel',
            timestamps: false
        });
    }

    static associate(models) {
        this.belongsTo(models.EscolaModel, { foreignKey: 'escola' });
        this.hasMany(models.EventoModel, { foreignKey: 'departamento' });
        this.hasMany(models.FuncionarioModel, { foreignKey: 'departamento' });
    }
}

module.exports = { DepartamentoModel };
