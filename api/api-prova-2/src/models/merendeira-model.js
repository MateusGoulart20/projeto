const { Model, DataTypes } = require("sequelize");

class MerendeiraModel extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.TEXT
        }, {
            sequelize,
            tableName: 'merendeira',
            modelName: 'MerendeiraModel',
            timestamps: false
        });
    }
}

module.exports = { MerendeiraModel };
