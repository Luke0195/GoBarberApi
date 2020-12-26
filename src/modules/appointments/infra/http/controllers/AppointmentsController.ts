import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const createAppoiment = container.resolve(CreateAppointmentService);

    const parsedDate = parseISO(date);

    const appointment = await createAppoiment.execute({
      provider_id,
      date: parsedDate,
    });
    return response.json(appointment);
  }
}

export default new AppointmentsController();
