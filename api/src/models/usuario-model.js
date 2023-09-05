const { Model, DataTypes } = require("sequelize");

class UsuarioModel extends Model {
    static init(sequelize) {
        super.init({
            CPF: DataTypes.TEXT,
            nome: DataTypes.TEXT,
            senha: DataTypes.TEXT,
        }, {
            sequelize,
            tableName: 'usuario',
            modelName: 'UsuarioModel',
            timestamps: false
        });
    }
}

module.exports = { UsuarioModel };
