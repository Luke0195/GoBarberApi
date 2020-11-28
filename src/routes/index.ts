import { Router } from 'express';
import appointmentsRoutes from './appointmentsRoutes';
import usersRoutes from './usersRoutes';

const routes = Router();
routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);

export default routes;
