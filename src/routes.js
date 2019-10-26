import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentsController';

const routes = new Router();

routes.post('/session', SessionController.store);
routes.get('/students', StudentController.getAll);
routes.get('/students/:id', StudentController.getOne);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);
export default routes;
