const { Router } = require('express');
const { UserController } = require('./controller/user-controller');
const { TaskController } = require('./controller/task-controller');

const routes = Router();
const userController = new UserController();
const taskController = new TaskController();

routes.post('/user', userController.create);
routes.get('/user', userController.find);
routes.put('/user', userController.update);
routes.delete('/user', userController.delete);

routes.post('/task', taskController.create);
routes.get('/task', taskController.find);
routes.put('/task', taskController.update);
routes.delete('/task', taskController.delete);

module.exports = { routes };