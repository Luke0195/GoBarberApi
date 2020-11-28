import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repository/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRoutes = Router();

appointmentsRoutes.get('/', async (request, response) => {
  try {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    response.json(appointments);
  } catch (error) {
    response.json(error);
  }
});

appointmentsRoutes.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppoiment = new CreateAppointmentService();
    const appointment = await createAppoiment.execute({
      provider,
      date: parsedDate,
    });

    response.json(appointment);
  } catch (error) {
    response.status(400).json(error);
  }
});

export default appointmentsRoutes;
