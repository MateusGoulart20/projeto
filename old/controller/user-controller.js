const { UserModel } = require('../model/user-model');
const { UserView } = require('../view/user-view');

class UserController {
    async createUser(name) {
        try {
            await UserModel.create({
                name
            });
            UserView.userCreated();
        } catch (error) {
            UserView.errorCreateUser(error);
        }
    }
}

module.exports = { UserController };
