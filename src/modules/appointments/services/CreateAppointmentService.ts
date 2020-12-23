import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppoinmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}
class CreateAppoinmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppoinmentsRepository);
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 400);
    }
    const appointment = await appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppoinmentService;
