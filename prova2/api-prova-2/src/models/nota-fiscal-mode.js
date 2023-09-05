const { Model, DataTypes } = require("sequelize");

class NotaFiscalModel extends Model {
    static init(sequelize) {
        super.init({
            cnpjFornecedor: DataTypes.TEXT,
            data: DataTypes.TEXT,
            valor: DataTypes.FLOAT,
        }, {
            sequelize,
            tableName: 'nota_fiscal',
            modelName: 'NotaFiscalModel',
            timestamps: false
        });
    }
}

module.exports = { NotaFiscalModel };
