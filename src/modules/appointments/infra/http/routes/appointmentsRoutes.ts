import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
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
  const appointmentRepository = new AppointmentsRepository();
  const createAppoiment = new CreateAppointmentService(appointmentRepository);
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const appointment = await createAppoiment.execute({
    provider_id,
    date: parsedDate,
  });
  return response.json(appointment);
});

export default appointmentsRoutes;
