import { Router } from 'express';
import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointmentsRoutes';
import usersRoutes from '@modules/users/infra/http/routes/usersRoutes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessionsRoutes';

const routes = Router();
routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
