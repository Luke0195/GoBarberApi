import { Router } from 'express';
import sessionsController from '../controllers/SessionControllers';

const sessionsRoutes = Router();

sessionsRoutes.post('/', sessionsController.create);

export default sessionsRoutes;
