const { Model, DataTypes } = require("sequelize");

class PerformanceModel extends Model {
    static init(database) {
        super.init({
            totalTasksFinished: DataTypes.INTEGER,
        }, {
            modelName: 'Performance',
            tableName: 'performance',
            timestamps: false,
            sequelize: database
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId' });
    }
}

module.exports = { PerformanceModel };
