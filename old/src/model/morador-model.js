const { Model, DataTypes } = require('sequelize');
class MoradorModel extends Model {
    static init(database) {
        super.init({
            nome: DataTypes.TEXT,
            cep: DataTypes.TEXT,
            logradouro: DataTypes.TEXT,
            complemento: DataTypes.TEXT,
            bairro: DataTypes.TEXT,
            localidade: DataTypes.TEXT,
            uf: DataTypes.TEXT,
            ibge: DataTypes.INTEGER,
            ddd: DataTypes.INTEGER,
            siafi: DataTypes.INTEGER,

        }, {
            modelName: 'Morador',
            tableName: 'morador',
            timestamps: false,
            sequelize: database
        });
    }
}
module.exports = { MoradorModel };