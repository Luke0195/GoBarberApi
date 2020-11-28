import { startOfHour } from 'date-fns';
import Appointment from '../model/Appointment';
import AppoinmentsRepository from '../repository/AppointmentRepository';

interface Request {
  provider: string;
  date: Date;
}
class CreateAppoinmentService {
  private appointmentsRepository: AppoinmentsRepository;

  constructor(appoinmentsRepository: AppoinmentsRepository) {
    this.appointmentsRepository = appoinmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }
    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppoinmentService;
