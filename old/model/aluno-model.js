const { Model, DataTypes } = require('sequelize');
class AlunoModel extends Model {
    static init(database) {
        super.init({
            //id: DataTypes.INTEGER,
            //*
            /*id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            //*/
            nome: DataTypes.TEXT,
            sexo: DataTypes.TEXT,
            dataNascimento: DataTypes.DATE,
            curso: DataTypes.TEXT,
            cursaEnsionSuperior: DataTypes.BOOLEAN,
            estagiando: DataTypes.BOOLEAN,
        }, {
            modelName: 'Aluno',
            tableName: 'aluno',
            timestamps: false,
            sequelize: database
        });
    }
}
module.exports = { AlunoModel };