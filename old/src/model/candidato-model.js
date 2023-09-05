const { Model, DataTypes } = require("sequelize");

class CandidatoModel extends Model {
    static init(database) {
        super.init({
            idCandidato: DataTypes.INTEGER,
            idEstado: DataTypes.INTEGER,
            idCargo: DataTypes.INTEGER,
            nome: DataTypes.TEXT
        }, {
            modelName: 'UserTeam',
            tableName: 'user_team',
            timestamps: false,
            sequelize: database
        });
    }
    //static associate(models){        this.belongsToMany(models.Cargo, { foreignKey: 'idCargo', through: models.UserTeam });    }
}

module.exports = { CandidatoModel };