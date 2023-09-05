const { Model, DataTypes } = require("sequelize");

class EstadoModel extends Model {
    static init(database) {
        super.init({
            idEstado: DataTypes.INTEGER,
            nome: DataTypes.TEXT,
            sigla: DataTypes.TEXT(2),
        }, {
            modelName: 'Estado',
            tableName: 'estado',
            timestamps: false,
            sequelize: database
        });
    }

    static associate(models) {
        //this.hasMany(models.Candidato, { foreignKey: 'idEstado' });
        this.belongsToMany(models.Cargo, { foreignKey: 'idEstado', through: models.Candidato });
    }
}

module.exports = { EstadoModel };