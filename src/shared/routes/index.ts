import { Router } from 'express';
import appointmentsRoutes from './appointmentsRoutes';
import usersRoutes from './usersRoutes';
import sessionsRoutes from './sessionsRoutes';

const routes = Router();
routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
