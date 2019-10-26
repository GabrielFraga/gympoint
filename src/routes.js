import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentsController';

const routes = new Router();

routes.post('/session', SessionController.store);
routes.put('/students/:id', StudentController.update);

export default routes;
