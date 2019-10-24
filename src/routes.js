import { Router } from 'express';

const routes = new Router();

routes.get('/users', () => {
  console.log('funcionou');
});

export default routes;
