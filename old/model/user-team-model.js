const { Model, DataTypes } = require("sequelize");

class UserTeamModel extends Model {
    static init(database) {
        super.init({
            userId: DataTypes.INTEGER,
            teamId: DataTypes.INTEGER
        }, {
            modelName: 'UserTeam',
            tableName: 'user_team',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { UserTeamModel };
