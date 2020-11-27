import { Router } from 'express';

const appointmentsRoutes = Router();

const appointments = [];
appointmentsRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;
  const appointment = {
    provider,
    date,
  };

  appointments.push(appointment);
  return response.json(appointment);
});

export default appointmentsRoutes;
