const { Model, DataTypes } = require("sequelize");

class EventoModel extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.TEXT,
            comeco_evento: DataTypes.DATE,
            fim_evento: DataTypes.DATE,
            local: DataTypes.TEXT,
            id: DataTypes.INTEGER,
            departamento: DataTypes.INTEGER,
        }, {
            sequelize,
            tableName: 'evento',
            modelName: 'EventoModel',
            timestamps: false
        });
    }
}

module.exports = { EventoModel };
