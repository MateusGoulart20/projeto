const { Model, DataTypes } = require("sequelize");

class EscolaModel extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.TEXT,
            orcamento: DataTypes.FLOAT,
            CNPJ: DataTypes.TEXT,
            numero_contato: DataTypes.TEXT,
            email_contato: DataTypes.TEXT,
            quantidade_professores: DataTypes.INTEGER,
            quantidade_administrativos: DataTypes.INTEGER,
            quantidade_tercerizados: DataTypes.INTEGER,
            quantidade_estudantes: DataTypes.INTEGER,
            quantidade_salas: DataTypes.INTEGER,
            unidade_federativa: DataTypes.TEXT,
            cidade: DataTypes.TEXT,
            bairro: DataTypes.TEXT,
            rua: DataTypes.TEXT,
            numero_rua: DataTypes.TEXT,
        }, {
            sequelize,
            tableName: 'escola',
            modelName: 'EscolaModel',
            timestamps: false
        });
    }
}

module.exports = { EscolaModel };
