const { Model, DataTypes } = require("sequelize");

class EventoModel extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.TEXT,
            comeco_evento: DataTypes.DATE,
            fim_evento: DataTypes.DATE,
            local: DataTypes.TEXT,
            departamento: DataTypes.INTEGER,
        }, {
            sequelize,
            tableName: 'evento',
            modelName: 'EventoModel',
            timestamps: false
        });
    }

    static associate(models) {
        this.belongsTo(models.DepartamentoModel, {
            foreignKey: 'departamento',
            onDelete: 'RESTRICT'
        });
    }
}

module.exports = { EventoModel };
