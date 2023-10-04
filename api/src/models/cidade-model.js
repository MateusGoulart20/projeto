const { Model, DataTypes } = require("sequelize");

class DepartamentoModel extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.TEXT,
            sala: DataTypes.TEXT,
            estado: DataTypes.INTEGER,
        }, {
            sequelize,
            tableName: 'departamento',
            modelName: 'DepartamentoModel',
            timestamps: false
        });
    }

    static associate(models) {
        this.belongsTo(models.EstadoModel, { foreignKey: 'estado' });
    }
}

module.exports = { DepartamentoModel };