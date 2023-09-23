import { Router } from 'express';
import { UsersController } from './controllers';
import { validateUserData } from './middlewares';

export const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/', validateUserData, usersController.create);

usersRoutes.get('/', usersController.listAllUsers);

usersRoutes.post('/login', usersController.login);
