const { Model, DataTypes } = require('sequelize');
class NotaFiscalModel extends Model {
    static init(database) {
        super.init({
            data: DataTypes.DATE,
            valor: DataTypes.REAL ,
            cnpj_fornecedor: DataTypes.TEXT,
        }, {
            modelName: 'NotaFiscal',
            tableName: 'nota_fiscal',
            timestamps: false,
            sequelize: database
        });
    }
}
module.exports = { NotaFiscalModel };