const { Model, DataTypes } = require("sequelize");

class TaskModel extends Model {
    static init(database) {
        super.init({
            description: DataTypes.TEXT,
            finished: DataTypes.BOOLEAN,
        }, {
            modelName: 'Task',
            tableName: 'tasks',
            timestamps: false,
            sequelize: database
        });
    }

    static associate(models) {
        // Uma tarefa pertence a um usuário
        this.belongsTo(models.User, { foreignKey: 'userId' });
    }
}

module.exports = { TaskModel };
