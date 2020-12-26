import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import appointmentsController from '../controllers/AppointmentsController';

const appointmentsRoutes = Router();

appointmentsRoutes.use(ensureAuthenticated);
/* appointmentsRoutes.get('/', async (request, response) => {
  console.log(request.user);

  const appointments = await appointmentsRepository.find();
  response.json(appointments);
});
*/
appointmentsRoutes.post('/', appointmentsController.create);

export default appointmentsRoutes;
