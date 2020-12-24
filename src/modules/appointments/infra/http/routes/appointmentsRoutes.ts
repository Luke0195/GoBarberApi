import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();

appointmentsRoutes.use(ensureAuthenticated);
/* appointmentsRoutes.get('/', async (request, response) => {
  console.log(request.user);

  const appointments = await appointmentsRepository.find();
  response.json(appointments);
});
*/
appointmentsRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const createAppoiment = container.resolve(CreateAppointmentService);

  const parsedDate = parseISO(date);

  const appointment = await createAppoiment.execute({
    provider_id,
    date: parsedDate,
  });
  return response.json(appointment);
});

export default appointmentsRoutes;
