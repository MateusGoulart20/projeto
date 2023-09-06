const { Model, DataTypes } = require("sequelize");

class DepartamentoModel extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.TEXT,
            sala: DataTypes.TEXT,
            escola: DataTypes.INTEGER,
            id: DataTypes.INTEGER,
        }, {
            sequelize,
            tableName: 'departamento',
            modelName: 'DepartamentoModel',
            timestamps: false
        });
    }
}

module.exports = { DepartamentoModel };
