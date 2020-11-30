import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repository/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();

appointmentsRoutes.use(ensureAuthenticated);
appointmentsRoutes.get('/', async (request, response) => {
  console.log(request.user);

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  response.json(appointments);
});

appointmentsRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppoiment = new CreateAppointmentService();
  const appointment = await createAppoiment.execute({
    provider_id,
    date: parsedDate,
  });
  return response.json(appointment);
});

export default appointmentsRoutes;
