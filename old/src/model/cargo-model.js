const { Model, DataTypes } = require("sequelize");

class CargoModel extends Model {
    static init(database) {
        super.init({
            idCargo: DataTypes.INTEGER,
            nome: DataTypes.TEXT,
        }, {
            modelName: 'Cargo',
            tableName: 'cargo',
            timestamps: false,
            sequelize: database
        });
    }

    static associate(models) {
        //this.hasMany(models.Candidato, { foreignKey: 'idCargo' });
        this.belongsToMany(models.Estado, { foreignKey: 'idCargo', through: models.Candidato });
    }
}

module.exports = { CargoModel };
