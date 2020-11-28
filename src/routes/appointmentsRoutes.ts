import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repository/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRoutes = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRoutes.get('/', (request, response) => {
  const appointments = appointmentsRepository.index();
  return response.json(appointments);
});

appointmentsRoutes.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppoiment = new CreateAppointmentService(
      appointmentsRepository
    );

    const appointment = createAppoiment.execute({ provider, date: parsedDate });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json(error.message);
  }
});

export default appointmentsRoutes;
