const { Model, DataTypes } = require("sequelize");

class EstadoModel extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.TEXT,
        }, {
            sequelize,
            tableName: 'estado',
            modelName: 'EstadoModel',
            timestamps: false
        });
    }
    static associate(models) {
        this.hasMany(models.CidadeModel, {
            foreignKey: 'estado',
            onDelete: 'CASCADE'
        });
    }
}

module.exports = { EstadoModel };