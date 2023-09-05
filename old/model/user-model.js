const { Model, DataTypes } = require("sequelize");

class UserModel extends Model {
    static init(database) {
        super.init({
            name: DataTypes.TEXT,
        }, {
            modelName: 'User',
            tableName: 'users',
            timestamps: false,
            sequelize: database
        });
    }

    static associate(models) {
        this.hasMany(models.Task, { foreignKey: 'userId' });
        this.hasOne(models.Performance, { foreignKey: 'userId' });
        this.belongsToMany(models.Team, { foreignKey: 'userId', through: models.UserTeam });
    }
}

module.exports = { UserModel };
