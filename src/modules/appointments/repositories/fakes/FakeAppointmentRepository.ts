import { uuid } from 'uuidv4';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentRepository from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppoiment = this.appointments.find(
      appoiment => appoiment.date === date
    );

    return findAppoiment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentRepository): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid, date, provider_id });
    // appointment.id = uuid();
    // appointment.date = date;
    // appointment.provider_id = provider_id;

    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentRepository;
