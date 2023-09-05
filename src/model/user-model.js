const { Model, DataTypes } = require('sequelize');
class UserModel extends Model {
    static init(database) {
        super.init({
            //Cada tarefa está associada a um usuário responsável por sua execução. Cada usuário possui um ID, nome e e-mail.
            nome: DataTypes.TEXT,
            email: DataTypes.TEXT,
        }, {
            modelName: 'User',
            tableName: 'user',   
            timestamps: false,
            sequelize: database
        });
    }
    static associate(models) {
        this.hasMany(models.Task, { foreignKey: 'id' });
    }
    
}
module.exports = { UserModel };