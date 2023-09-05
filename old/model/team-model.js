const { Model, DataTypes } = require("sequelize");

class TeamModel extends Model {
    static init(database) {
        super.init({
            name: DataTypes.TEXT,
        }, {
            modelName: 'Team',
            tableName: 'team',
            timestamps: false,
            sequelize: database
        });
    }

    static associate(models) {
        this.belongsToMany(models.User, { foreignKey: 'teamId', through: models.UserTeam });
    }
}

module.exports = { TeamModel };
